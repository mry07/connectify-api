import BaseError from "./base-error";
import * as ErrorType from "../config/constants/error-type";
import { httpStatusText } from "../utils/http";
import { BaseErrorProps } from "./types/base-error";

class ApiError extends BaseError {
  constructor(httpCode: number, message: string) {
    const props: BaseErrorProps = {
      message,
      errorType: ErrorType.API_ERROR,
      httpCode,
      httpStatus: httpStatusText(httpCode),
    };

    super(props);
  }
}

export default ApiError;
