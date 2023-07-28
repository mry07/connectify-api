import * as HttpStatus from "../../config/constants/http-status.js";
import { BaseError } from "./base-error.js";
import { ErrorType } from "../index.types.js";
import { httpStatusText } from "../../utils/http.js";

export class ValidationError extends BaseError {
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
