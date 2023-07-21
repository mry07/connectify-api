import JsonWebToken from "jsonwebtoken";
import BaseError from "./base-error";
import * as ErrorType from "../config/constants/error-type";
import { httpStatus } from "../config/constants/http";
import { httpStatusText } from "../utils/http";
import { BaseErrorProps } from "./types/base-error";

class TokenError extends BaseError {
  constructor(error: any) {
    const httpCode = httpStatus.INTERNAL_SERVER_ERROR;
    const props: BaseErrorProps = {
      httpCode,
      errorType: ErrorType.TOKEN_ERROR,
      httpStatus: httpStatusText(httpCode),
    };

    if (error instanceof JsonWebToken.JsonWebTokenError) {
      props.message = "Token tidak valid";
      props.errorCode = "invalid_token";
      props.httpCode = httpStatus.FORBIDDEN;
    }

    if (error instanceof JsonWebToken.TokenExpiredError) {
      props.message = "Token kadaluarsa";
      props.errorCode = "expired_token";
      props.httpCode = httpStatus.UNAUTHORIZED;
    }

    props.httpStatus = httpStatusText(props.httpCode);

    super(props);
  }
}

export default TokenError;
