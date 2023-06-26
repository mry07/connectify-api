import JsonWebToken from "jsonwebtoken";
import BaseError from "./base-error.js";
import { errorTypes } from "../config/constants/error.js";
import { httpStatus, httpStatusText } from "../config/constants/http.js";

class TokenError extends BaseError {
  constructor(error) {
    let message;
    let errorType;
    let errorCode;
    let httpCode;

    if (error instanceof JsonWebToken.JsonWebTokenError) {
      message = "Token tidak valid";
      errorType = errorTypes.TOKEN_ERROR;
      errorCode = "invalid_token";
      httpCode = httpStatus.FORBIDDEN;
    }

    if (error instanceof JsonWebToken.TokenExpiredError) {
      message = "Token telah kadaluarsa";
      errorType = errorTypes.TOKEN_ERROR;
      errorCode = "expired_token";
      httpCode = httpStatus.UNAUTHORIZED;
    }

    super({
      message,
      errorType,
      errorCode,
      httpCode,
      httpStatus: httpStatusText(httpCode),
    });
  }
}

export default TokenError;
