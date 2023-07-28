import DevError from "../../../error/dev-error.js";
import * as Service from "../services/auth-service.js";
import * as HttpStatus from "../../../config/constants/http-status.js";
import { RequestHandler } from "express";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const result = await Service.login(req);
    res.send({
      status: "ok",
      data: {
        token: result.token,
        refresh_token: result.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    await Service.logout(req);
    res.send({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export const register: RequestHandler = async (req, res, next) => {
  try {
    await Service.register(req);
    res.send({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken: RequestHandler = async (req, res, next) => {
  const { refresh_token } = req.body;

  try {
    // check `refresh_token` field
    if (refresh_token === undefined) {
      throw new DevError(HttpStatus.BAD_REQUEST, `missing_parameter`);
    }

    const result = await Service.refreshToken(req);
    res.send({ status: "ok", data: { token: result.token } });
  } catch (error) {
    next(error);
  }
};
