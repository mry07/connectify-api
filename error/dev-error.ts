import BaseError from "./base-error";
import * as ErrorType from "../config/constants/error-type";
import { httpStatusText } from "../utils/http";
import * as Types from "./types/base-error";

class DevError extends BaseError {
  constructor(httpCode: number, errorCode: string, message?: string) {
    const props: Types.BaseErrorProps = {
      message,
      errorType: ErrorType.DEV_ERROR,
      errorCode,
      httpCode,
      httpStatus: httpStatusText(httpCode),
    };

    super(props);
  }
}

export default DevError;
