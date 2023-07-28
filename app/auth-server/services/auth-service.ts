import Bcrypt from "bcrypt";
import JsonWebToken from "jsonwebtoken";
import * as HttpStatus from "../../../config/constants/http-status.js";
import { pool } from "../../../config/database.js";
import { Request } from "express";
import { ErrorType } from "../../../exception/index.types.js";
import { TokenPayload } from "../../../utils/token.types.js";
import { httpStatusText } from "../../../utils/http.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { generateToken, generateRefreshToken } from "../../../utils/token.js";
import {
  BaseError,
  ApiError,
  DevError,
  TokenError,
} from "../../../exception/index.js";

export const login = async (req: Request) => {
  const appId = req.headers["app-id"];
  const { email, password } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // check email and session
    const sql = `SELECT
      u.id,
      u.username,
      u.email,
      u.password,
      r.name AS role,
      IF(us.id, 1, 0) AS session_status
    FROM
      users u
      INNER JOIN roles r ON u.role_id = r.id
      LEFT JOIN user_sessions us ON us.user_id = u.id AND us.app_id = ?
    WHERE
      email = ?`;
    const [rows] = await connection.execute<RowDataPacket[]>(sql, [
      appId,
      email,
    ]);

    if (!rows.length) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Email tidak ditemukan");
    }

    if (rows[0].session_status) {
      throw new ApiError(HttpStatus.CONFLICT, "Kamu sudah terautentikasi!");
    }

    // authenticate password
    const match = await Bcrypt.compare(password, rows[0].password);
    if (!match) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, "Password salah");
    }

    // generate access token and refresh token
    const payload: TokenPayload = {
      sub: rows[0].id,
      username: rows[0].username,
      email: rows[0].email,
      role: rows[0].role,
      iss: appId as string,
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

export const logout = async (req: Request) => {
  const { sub, iss } = req.jwt;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // delete the session
    const sql = `DELETE FROM user_sessions WHERE user_id = ? AND app_id = ?`;
    const [rows] = await connection.execute<ResultSetHeader>(sql, [sub, iss]);

    // session not found
    if (!rows.affectedRows) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Sesi login tidak ditemukan");
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const register = async (req: Request) => {
  const { name, username, email, password } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // check existing email or username
    const sql1 = `SELECT
      EXISTS(SELECT 1 FROM users WHERE email = ?) AS email_exist,
      EXISTS(SELECT 1 FROM users WHERE username = ?) AS username_exist`;
    const [user] = await connection.execute<RowDataPacket[]>(sql1, [
      email,
      username,
    ]);

    if (user[0].email_exist) {
      throw new ApiError(HttpStatus.CONFLICT, "Email sudah digunakan");
    }

    if (user[0].username_exist) {
      throw new ApiError(HttpStatus.CONFLICT, "Username sudah digunakan");
    }

    // register new user
    const hashedPassword = await Bcrypt.hash(password, 10);
    const sql2 = `INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)`;
    await connection.execute(sql2, [name, username, email, hashedPassword]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const refreshToken = async (req: Request) => {
  const appId = req.headers["app-id"];
  const { refresh_token } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // check user session
    const sql = `SELECT * FROM user_sessions WHERE app_id = ? AND refresh_token = ?`;
    const [rows] = await connection.execute<RowDataPacket[]>(sql, [
      appId,
      refresh_token,
    ]);

    // error if session not found
    if (!rows.length) {
      throw new DevError(
        HttpStatus.UNAUTHORIZED,
        "relogin_required",
        "Mohon lakukan login ulang"
      );
    }

    // verify `refresh_token`
    const decoded = JsonWebToken.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET as JsonWebToken.Secret
    ) as TokenPayload;

    // error if appId does not match
    if (appId !== decoded.iss) {
      const errorCode = "an_error_occurred";
      const errorType = ErrorType.TokenError;
      const httpCode = HttpStatus.UNAUTHORIZED;
      const httpStatus = httpStatusText(httpCode);

      throw new BaseError({ httpCode, errorCode, errorType, httpStatus });
    }

    // generate new access token
    const token = generateToken({
      sub: decoded.sub,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
      iss: appId as string,
    });

    await connection.commit();

    return { token };
  } catch (error) {
    await connection.rollback();

    if (error instanceof BaseError || error instanceof DevError) {
      throw error;
    }

    throw new TokenError(error);
  } finally {
    connection.release();
  }
};
