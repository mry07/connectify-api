import BaseError from "./base-error.js";
import { errorTypes } from "../config/constants/error.js";
import { httpStatus, httpStatusText } from "../config/constants/http.js";

class ValidationError extends BaseError {
  constructor(error) {
    const errors = [];

    for (const item of error.details) {
      errors.push({ field: item.context.key, message: item.message });
    }

    super({
      message: error.message,
      errorType: errorTypes.VALIDATION_ERROR,
      httpCode: httpStatus.UNPROCESSABLE_CONTENT,
      httpStatus: httpStatusText(httpStatus.UNPROCESSABLE_CONTENT),
      errors,
    });
  }
}

export default ValidationError;
