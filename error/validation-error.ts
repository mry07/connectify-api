import BaseError from "./base-error";
import * as ErrorType from "../config/constants/error-type";
import { httpStatus } from "../config/constants/http";
import { httpStatusText } from "../utils/http";
import * as Types from "./types/base-error";

class ValidationError extends BaseError {
  constructor(error: any) {
    let errors: any[] = [];
    const httpCode: number = httpStatus.UNPROCESSABLE_CONTENT;
    const props: Types.BaseErrorProps = {
      message: error.message,
      errorType: ErrorType.VALIDATION_ERROR,
      httpCode,
      httpStatus: httpStatusText(httpCode),
    };

    for (const item of error.details) {
      errors.push({ field: item.context.key, message: item.message });
    }

    props.errors = errors;

    super(props);
  }
}

export default ValidationError;
