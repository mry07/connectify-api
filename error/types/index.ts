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
