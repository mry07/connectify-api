import JsonWebToken from "jsonwebtoken";
import * as HttpStatus from "../../config/constants/http-status.js";
import { BaseError } from "./base-error.js";
import { ErrorType } from "../index.types.js";
import { httpStatusText } from "../../utils/http.js";

export class TokenError extends BaseError {
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
