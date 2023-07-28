import { ErrorType, BaseErrorProps } from "./index.types.js";

class BaseError extends Error {
  errorType: ErrorType;

  errorCode?: string;

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
    this.errorType = errorType;
    this.httpCode = httpCode;
    this.httpStatus = httpStatus;

    if (
      errorType === ErrorType.DevError ||
      errorType === ErrorType.TokenError
    ) {
      this.errorCode = errorCode;
    }

    if (errorType === ErrorType.ValidationError) {
      this.errors = errors;
    }

    Error.captureStackTrace(this);
  }
}

export default BaseError;
