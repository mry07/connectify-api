import BaseError from "./base-error.js";
import { errorTypes } from "./error-constant.js";
import { httpStatusText } from "../utils/http-status.js";

class ApiError extends BaseError {
  constructor(httpCode, message) {
    super({ 
      message,
      errorType: errorTypes.API_ERROR,
      httpCode,
      httpStatus: httpStatusText(httpCode),
    })
  }
}

export default ApiError;
