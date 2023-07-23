import BaseError from "./base-error";
// import * as ErrorType from "../config/constants/error-type";
import * as HttpStatus from "../config/constants/http-status";
import { httpStatusText } from "../utils/http";
import { BaseErrorProps, ErrorType } from "./index.types";
// import * as Types from "./types/base-error";

class ValidationError extends BaseError {
  constructor(error: any) {
    const errors = [];
    const message = error.message;
    const errorType = ErrorType.ValidationError;
    const httpCode = HttpStatus.UNPROCESSABLE_CONTENT;
    const httpStatus = httpStatusText(httpCode);

    for (const item of error.details) {
      errors.push({ field: item.context.key, message: item.message });
    }

    super({ message, errorType, httpCode, httpStatus, errors });
  }
}

export default ValidationError;
