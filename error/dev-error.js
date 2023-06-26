import BaseError from "./base-error.js";
import { errorTypes } from "../config/constants/error.js";
import { httpStatusText } from "../config/constants/http.js";

class DevError extends BaseError {
  constructor(httpCode, errorCode, message) {
    super({
      message,
      errorType: errorTypes.DEV_ERROR,
      errorCode,
      httpCode,
      httpStatus: httpStatusText(httpCode),
    });
  }
}

export default DevError;
