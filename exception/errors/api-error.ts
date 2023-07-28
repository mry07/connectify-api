import { BaseError } from "./base-error.js";
import { ErrorType } from "../index.types.js";
import { httpStatusText } from "../../utils/http.js";

export class ApiError extends BaseError {
  constructor(httpCode: number, message: string) {
    super({
      message,
      errorType: ErrorType.ApiError,
      httpCode,
      httpStatus: httpStatusText(httpCode),
    });
  }
}
