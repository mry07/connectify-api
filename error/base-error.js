import { errorTypes } from "../config/constants/error.js";

class BaseError extends Error {
  constructor({ message, errorType, errorCode, httpCode, httpStatus, errors }) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.errorType = errorType;

    if (errorType === errorTypes.DEV_ERROR) {
      this.errorCode = errorCode;
    }

    this.httpCode = httpCode;
    this.httpStatus = httpStatus;

    if (errorType === errorTypes.VALIDATION_ERROR) {
      this.errors = errors;
    }

    Error.captureStackTrace(this);
  }
}

export default BaseError;
