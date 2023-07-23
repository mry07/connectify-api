import { ErrorType, BaseErrorProps } from "./index.types";

class BaseError extends Error {
  type: ErrorType;

  code?: string;

  httpCode: number;

  httpStatus: string;

  errors?: any;

  constructor({
    message,
    errorType,
    errorCode,
    httpCode,
    httpStatus,
    errors,
  }: BaseErrorProps) {
    super(message);
    this.type = errorType;
    this.httpCode = httpCode;
    this.httpStatus = httpStatus;

    if (
      errorType === ErrorType.DevError ||
      errorType === ErrorType.TokenError
    ) {
      this.code = errorCode;
    }

    if (errorType === ErrorType.ValidationError) {
      this.errors = errors;
    }

    Error.captureStackTrace(this);
  }
}

export default BaseError;
