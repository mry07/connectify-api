import Bcrypt from "bcrypt";
import ApiError from "../error/api-error.js";
import DevError from "../error/dev-error.js";
import TokenError from "../error/token-error.js";
import JsonWebToken from "jsonwebtoken";
import { Pool } from "../config/database.js";
import { httpStatus } from "../config/constants/http.js";
import { errorTypes } from "../config/constants/error.js";
import { generateToken, generateRefreshToken } from "../utils/jwt.js";

export const login = async (req) => {
  const appId = req.headers["app-id"];
  const { email, password } = req.body;
  const connection = await Pool.getConnection();

  try {
    await connection.beginTransaction();

    // check email and session
    const [rows] = await connection.execute(
      `SELECT u.id, u.username, u.email, u.password, r.name as role, 
       (SELECT COUNT(*) FROM user_sessions WHERE user_id = u.id AND app_id = ?) as session
          FROM users u
          INNER JOIN roles r ON u.role_id = r.id
          WHERE email = ?`,
      [appId, email]
    );

    if (!rows.length) {
      throw new ApiError(httpStatus.NOT_FOUND, "Email tidak ditemukan");
    }

    if (rows[0].session) {
      throw new ApiError(httpStatus.CONFLICT, "Kamu sudah terautentikasi!");
    }

    // authenticate password
    const match = await Bcrypt.compare(password, rows[0].password);
    if (!match) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Password salah");
    }

    // generate access token and refresh token
    const payload = {
      sub: rows[0].id,
      username: rows[0].username,
      email: rows[0].email,
      role: rows[0].role,
      iss: appId,
    };
    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // insert new session
    await connection.execute(
      "INSERT INTO user_sessions (user_id, app_id, refresh_token) VALUES (?, ?, ?)",
      [rows[0].id, appId, refreshToken]
    );

    await connection.commit();

    return { token, refreshToken };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const logout = async (req) => {
  const { sub, iss } = req.jwt;
  const connection = await Pool.getConnection();

  try {
    await connection.beginTransaction();

    // delete the session
    const [rows] = await connection.execute(
      "DELETE FROM user_sessions WHERE user_id = ? AND app_id = ?",
      [sub, iss]
    );

    // session not found
    if (!rows.affectedRows) {
      throw new ApiError(httpStatus.NOT_FOUND, "Sesi login tidak ditemukan");
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const register = async (req) => {
  const { name, username, email, password } = req.body;
  const connection = await Pool.getConnection();

  try {
    await connection.beginTransaction();

    // check existing email or username
    const [user] = await connection.execute(
      `SELECT
        EXISTS(SELECT 1 FROM users WHERE email = ?) AS email_exist,
        EXISTS(SELECT 1 FROM users WHERE username = ?) AS username_exist`,
      [email, username]
    );

    if (user[0].email_exist) {
      throw new ApiError(httpStatus.CONFLICT, "Email sudah digunakan");
    }

    if (user[0].username_exist) {
      throw new ApiError(httpStatus.CONFLICT, "Username sudah digunakan");
    }

    // register new user
    const hashedPassword = await Bcrypt.hash(password, 10);
    await connection.execute(
      "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)",
      [name, username, email, hashedPassword]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const refreshToken = async (req) => {
  const appId = req.headers["app-id"];
  const { refresh_token } = req.body;
  const connection = await Pool.getConnection();

  try {
    await connection.beginTransaction();

    if (refresh_token === undefined) {
      throw new DevError(httpStatus.BAD_REQUEST, `missing_parameter`);
    }

    const [rows] = await connection.execute(
      `SELECT * FROM user_sessions WHERE app_id = ? AND refresh_token = ?`,
      [appId, refresh_token]
    );
    if (!rows.length) {
      throw new DevError(
        httpStatus.UNAUTHORIZED,
        "relogin_required",
        "Mohon lakukan login ulang"
      );
    }

    // verify refresh token
    const { iat, ...payload } = JsonWebToken.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (appId !== payload.iss) {
      throw new DevError(httpStatus.BAD_REQUEST, "an_error_occurred");
    }

    // generate new access token
    const token = generateToken(payload);

    await connection.commit();

    return { token };
  } catch (error) {
    await connection.rollback();

    if (error.errorType === errorTypes.DEV_ERROR) {
      throw error;
    } else {
      throw new TokenError(error);
    }
  } finally {
    connection.release();
  }
};
