import ApiError from "../error/api-error";
import * as Time from "./constants/time";
import { Options } from "express-rate-limit";
import * as HttpStatus from "./constants/http-status";
import { RequestHandler } from "express";

const handler: RequestHandler = (req, res, next) => {
  const message = "Terlalu banyak permintaan";
  next(new ApiError(HttpStatus.TOO_MANY_REQUESTS, message));
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
