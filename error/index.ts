import * as Error from "./index.types";
import * as HttpStatus from "../config/constants/http-status";
import { ErrorRequestHandler, RequestHandler } from "express";
import {
  ApiErrorResponse,
  DevErrorResponse,
  ValidationErrorResponse,
} from "./index.types";

export const handler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.errorType === Error.ErrorType.ApiError) {
    res.status(err.httpCode).send({
      status: err.errorType,
      message: err.message,
    } as ApiErrorResponse);
    return;
  }

  if (
    err.errorType === Error.ErrorType.DevError ||
    err.errorType === Error.ErrorType.TokenError
  ) {
    res.status(err.httpCode).send({
      status: err.errorType,
      error_code: err.errorCode,
    } as DevErrorResponse);
    return;
  }

  if (err.errorType === Error.ErrorType.ValidationError) {
    res.status(err.httpCode).send({
      status: err.errorType,
      errors: err.errors,
    } as ValidationErrorResponse);
    return;
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
    status: Error.ErrorType.ApiError,
    message: "Terjadi kesalahan pada server",
  });
};

export const endpoint: RequestHandler = (req, res, next) => {
  res.status(HttpStatus.NOT_FOUND).send({
    status: Error.ErrorType.DevError,
    error_code: "invalid_endpoint",
  });
};
