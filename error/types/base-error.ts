import {
  API_ERROR,
  DEV_ERROR,
  VALIDATION_ERROR,
  TOKEN_ERROR,
} from "../../config/constants/error-type.js";

export type ErrorType =
  | typeof API_ERROR
  | typeof DEV_ERROR
  | typeof VALIDATION_ERROR
  | typeof TOKEN_ERROR;

export interface BaseErrorProps {
  message?: string;
  errorType: ErrorType;
  errorCode?: string;
  httpCode: number;
  httpStatus: string;
  errors?: any;
}
