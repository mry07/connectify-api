import BaseError from "./base-error";
import { httpStatusText } from "../utils/http";
import { BaseErrorProps, ErrorType } from "./index.types";

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
