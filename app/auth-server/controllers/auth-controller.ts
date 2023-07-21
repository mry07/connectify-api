import * as Service from "../services/auth-service";
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
  try {
    const result = await Service.refreshToken(req);
    res.send({ status: "ok", data: { token: result.token } });
  } catch (error) {
    next(error);
  }
};
