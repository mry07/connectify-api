import BaseError from "./base-error.js";
import { errorTypes } from "../config/constants/error.js";
import { httpStatusText } from "../config/constants/http.js";

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
