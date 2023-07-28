import BaseError from "./base-error.js";
import { ErrorType } from "./index.types.js";
import { httpStatusText } from "../utils/http.js";

class ApiError extends BaseError {
  constructor(httpCode: number, message: string) {
    super({
      message,
      errorType: ErrorType.ApiError,
      httpCode,
      httpStatus: httpStatusText(httpCode),
    });
  }
}

export default ApiError;
