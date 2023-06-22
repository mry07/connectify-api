import BaseError from "./base-error.js";
import { errorTypes } from "./error-constant.js";
import { httpStatusText } from "../utils/http-status.js";

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
