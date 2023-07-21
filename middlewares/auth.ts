import BaseError from "../error/base-error";
import TokenError from "../error/token-error";
import JsonWebToken from "jsonwebtoken";
import * as ErrorType from "../config/constants/error-type";
import { httpStatus as httpStatusCode } from "../config/constants/http";
import { httpStatusText } from "../utils/http";
import { BaseErrorProps } from "../error/types/base-error";
import { TokenPayload } from "../utils/types/token";
import { AuthMidd } from "./types/auth";

const Auth: AuthMidd = (roles) => (req, res, next) => {
  const appId = req.headers["app-id"];
  const author = req.headers.authorization;
  const token = author?.split(" ")[1];
  const httpCode = httpStatusCode.UNAUTHORIZED;
  const error: BaseErrorProps = {
    httpCode,
    errorType: ErrorType.TOKEN_ERROR,
    httpStatus: httpStatusText(httpCode),
  };

  try {
    // check token
    if (!token) {
      error.errorCode = "missing_parameter";
      throw new BaseError(error);
    }

    // verify token
    const decoded = JsonWebToken.verify(
      token,
      process.env.TOKEN_SECRET as JsonWebToken.Secret
    ) as TokenPayload;

    // check `appId` is matched with decoded token
    if (appId !== decoded.iss) {
      error.errorCode = "an_error_occurred";
      throw new BaseError(error);
    }

    // check specific role
    if (roles.length && !roles.includes(decoded.role)) {
      error.errorCode = "invalid_role";
      throw new BaseError(error);
    }

    // assign token decoded to `req.jwt`
    req.jwt = decoded;

    next();
  } catch (error) {
    if (error instanceof BaseError) {
      next(error);
      return;
    }

    const tokenError = new TokenError(error);
    next(tokenError);
  }
};

declare global {
  namespace Express {
    export interface Request {
      jwt?: any;
    }
  }
}

export default Auth;
