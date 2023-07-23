import BaseError from "./base-error";
import JsonWebToken from "jsonwebtoken";
import * as HttpStatus from "../config/constants/http-status";
import { httpStatusText } from "../utils/http";
import { BaseErrorProps, ErrorType } from "./index.types";

class TokenError extends BaseError {
  constructor(error: any) {
    let message;
    let errorCode;
    let errorType = ErrorType.TokenError;
    let httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (error instanceof JsonWebToken.JsonWebTokenError) {
      message = "Token tidak valid";
      errorCode = "invalid_token";
      httpCode = HttpStatus.FORBIDDEN;
    }

    if (error instanceof JsonWebToken.TokenExpiredError) {
      message = "Token kadaluarsa";
      errorCode = "expired_token";
      httpCode = HttpStatus.UNAUTHORIZED;
    }

    let httpStatus = httpStatusText(httpCode);

    super({ message, errorCode, errorType, httpCode, httpStatus });
  }
}

export default TokenError;
