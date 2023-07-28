export interface ApiErrorResponse {
  status: string;
  message: string;
}

export interface DevErrorResponse {
  status: string;
  error_code: string;
  message?: string;
}

export interface ValidationErrorResponse {
  status: string;
  errors: any;
}

export enum ErrorType {
  ApiError = "api_error",
  DevError = "dev_error",
  TokenError = "signature_error",
  ValidationError = "validation_error",
}

export interface BaseErrorProps {
  message?: string;
  errorType: ErrorType;
  errorCode?: string;
  httpCode: number;
  httpStatus: string;
  errors?: any;
}
