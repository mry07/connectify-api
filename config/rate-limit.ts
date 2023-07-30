import * as Time from "./constants/time.js";
import * as HttpStatus from "./constants/http-status.js";
import { Options } from "express-rate-limit";
import { ApiError } from "../exception/errors/index.js";
import { RequestHandler } from "express";

const handler: RequestHandler = (req, res, next) => {
  const message = "Terlalu banyak permintaan";
  next(new ApiError(HttpStatus.TOO_MANY_REQUESTS, message));
};

// auth/login
export const login: Partial<Options> = {
  windowMs: 5 * Time.MINUTES,
  max: 5,
  handler,
};

// auth/refresh-token
export const refreshToken: Partial<Options> = {
  windowMs: Time.HOURS + 5 * Time.MINUTES,
  max: 1,
  handler,
};
