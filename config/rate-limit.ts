import ApiError from "../error/api-error";
import * as Time from "./constants/time";
import { Options } from "express-rate-limit";
import { httpStatus } from "./constants/http";
import { RequestHandler } from "express";

const handler: RequestHandler = (req, res, next) => {
  const message = "Terlalu banyak permintaan";
  next(new ApiError(httpStatus.TOO_MANY_REQUESTS, message));
};

export const authLogin: Partial<Options> = {
  windowMs: 5 * Time.MINUTES,
  max: 5,
  handler,
};

export const authRefreshToken: Partial<Options> = {
  windowMs: Time.HOURS + 5 * Time.MINUTES,
  max: 1,
  handler,
};
