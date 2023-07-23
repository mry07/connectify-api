import BaseError from "./base-error";
import { ErrorType } from "./index.types";
import { httpStatusText } from "../utils/http";

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
