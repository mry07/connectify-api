import * as ErrorType from "../config/constants/error-type";
import { httpStatus } from "../config/constants/http";
import { ErrorRequestHandler, RequestHandler } from "express";
import {
  ApiErrorResponse,
  DevErrorResponse,
  ValidationErrorResponse,
} from "./types/index";

export const handler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  switch (err.errorType) {
    case ErrorType.API_ERROR:
      const response1: ApiErrorResponse = {
        status: err.errorType,
        message: err.message,
      };

      res.status(err.httpCode).send(response1);
      break;
    case ErrorType.DEV_ERROR:
    case ErrorType.TOKEN_ERROR:
      const response2: DevErrorResponse = {
        status: err.errorType,
        error_code: err.errorCode,
      };

      if (err.message) {
        response2.message = err.message;
      }

      res.status(err.httpCode).send(response2);
      break;
    case ErrorType.VALIDATION_ERROR:
      const response3: ValidationErrorResponse = {
        status: err.errorType,
        errors: err.errors,
      };

      res.status(err.httpCode).send(response3);
      break;
    default:
      const response4: ApiErrorResponse = {
        status: ErrorType.API_ERROR,
        message: "Terjadi kesalahan pada server",
      };

      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response4);
      break;
  }
};

export const endpointError: RequestHandler = (req, res, next) => {
  const response: DevErrorResponse = {
    status: ErrorType.DEV_ERROR,
    error_code: "invalid_endpoint",
  };

  res.status(httpStatus.NOT_FOUND).send(response);
};
