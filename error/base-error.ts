import * as Types from "./types/base-error";
import * as ErrorType from "../config/constants/error-type";

class BaseError extends Error {
  errorType: Types.ErrorType;
  errorCode?: string;
  httpCode: number;
  httpStatus: string;
  errors?: any;

  constructor(props: Types.BaseErrorProps) {
    super(props.message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.errorType = props.errorType;

    if (
      props.errorType === ErrorType.DEV_ERROR ||
      props.errorType === ErrorType.TOKEN_ERROR
    ) {
      this.errorCode = props.errorCode;
    }

    this.httpCode = props.httpCode;
    this.httpStatus = props.httpStatus;

    if (props.errorType === ErrorType.VALIDATION_ERROR) {
      this.errors = props.errors;
    }

    Error.captureStackTrace(this);
  }
}

export default BaseError;
