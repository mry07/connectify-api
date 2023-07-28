import BaseError from "./base-error.js";
import { httpStatusText } from "../utils/http.js";
import { BaseErrorProps, ErrorType } from "./index.types.js";

class DevError extends BaseError {
  constructor(httpCode: number, errorCode: string, message?: string) {
    const props: BaseErrorProps = {
      message,
      errorType: ErrorType.DevError,
      errorCode,
      httpCode,
      httpStatus: httpStatusText(httpCode),
    };

    super(props);
  }
}

export default DevError;
