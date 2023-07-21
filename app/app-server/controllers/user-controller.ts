import * as Service from "../services/user-service";
import { RequestHandler } from "express";

export const details: RequestHandler = async (req, res, next) => {
  try {
    const result = await Service.details(req);
    res.send({ status: "ok", data: result.data });
  } catch (error) {
    next(error);
  }
};

export const followUnfollow: RequestHandler = async (req, res, next) => {
  try {
    await Service.followUnfollow(req);
    res.send({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const result = await Service.getPosts(req);
    res.send({ status: "ok", data: result.data });
  } catch (error) {
    next(error);
  }
};
