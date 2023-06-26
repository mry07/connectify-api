import ApiError from "../error/api-error.js";
import * as Time from "../utils/time.js";
import { rateLimit, RateLimitExceededEventHandler } from "express-rate-limit";
import { httpStatus } from "../config/constants/http.js";

interface Options {
  timeout?: number;
  max?: number;
  handler?: RateLimitExceededEventHandler;
}

const defaultOptions: Options = {
  timeout: 10 * Time.MINUTES,
  max: 20,
  handler: (_1, _2, next) => {
    next(
      new ApiError(httpStatus.TOO_MANY_REQUESTS, "Terlalu banyak permintaan!")
    );
  },
};

const Limiter = (options: Options) => {
  options = { ...defaultOptions, ...options };
  return rateLimit({
    windowMs: options.timeout,
    max: options.max,
    handler: options.handler,
  });
};

export default Limiter;
