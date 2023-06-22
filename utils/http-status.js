export const httpStatus = {
  CONTINUE: 100, // RFC 9110, 15.2.1
  SWITCHING_PROTOCOLS: 101, // RFC 9110, 15.2.2
  PROCESSING: 102, // RFC 2518, 10.1
  EARLY_HINTS: 103, // RFC 8297
  OK: 200, // RFC 9110, 15.3.1
  CREATED: 201, // RFC 9110, 15.3.2
  ACCEPTED: 202, // RFC 9110, 15.3.3
  NON_AUTHORITATIVE_INFO: 203, // RFC 9110, 15.3.4
  NO_CONTENT: 204, // RFC 9110, 15.3.5
  RESET_CONTENT: 205, // RFC 9110, 15.3.6
  PARTIAL_CONTENT: 206, // RFC 9110, 15.3.7
  MULTI_STATUS: 207, // RFC 4918, 11.1
  ALREADY_REPORTED: 208, // RFC 5842, 7.1
  IM_USED: 226, // RFC 3229, 10.4.1
  MULTIPLE_CHOICES: 300, // RFC 9110, 15.4.1
  MOVED_PERMANENTLY: 301, // RFC 9110, 15.4.2
  FOUND: 302, // RFC 9110, 15.4.3
  SEE_OTHER: 303, // RFC 9110, 15.4.4
  NOT_MODIFIED: 304, // RFC 9110, 15.4.5
  USE_PROXY: 305, // RFC 9110, 15.4.6
  TEMPORARY_REDIRECT: 307, // RFC 9110, 15.4.8
  PERMANENT_REDIRECT: 308, // RFC 9110, 15.4.9
  BAD_REQUEST: 400, // RFC 9110, 15.5.1
  UNAUTHORIZED: 401, // RFC 9110, 15.5.2
  PAYMENT_REQUIRED: 402, // RFC 9110, 15.5.3
  FORBIDDEN: 403, // RFC 9110, 15.5.4
  NOT_FOUND: 404, // RFC 9110, 15.5.5
  METHOD_NOT_ALLOWED: 405, // RFC 9110, 15.5.6
  NOT_ACCEPTABLE: 406, // RFC 9110, 15.5.7
  PROXY_AUTH_REQUIRED: 407, // RFC 9110, 15.5.8
  REQUEST_TIMEOUT: 408, // RFC 9110, 15.5.9
  CONFLICT: 409, // RFC 9110, 15.5.10
  GONE: 410, // RFC 9110, 15.5.11
  LENGTH_REQUIRED: 411, // RFC 9110, 15.5.12
  PRECONDITION_FAILED: 412, // RFC 9110, 15.5.13
  PAYLOAD_TOO_LARGE: 413, // RFC 9110, 15.5.14
  URI_TOO_LONG: 414, // RFC 9110, 15.5.15
  UNSUPPORTED_MEDIA_TYPE: 415, // RFC 9110, 15.5.16
  RANGE_NOT_SATISFIABLE: 416, // RFC 9110, 15.5.17
  EXPECTATION_FAILED: 417, // RFC 9110, 15.5.18
  TEAPOT: 418, // RFC 9110, 15.5.19 (Unused)
  MISDIRECTED_REQUEST: 421, // RFC 9110, 15.5.20
  UNPROCESSABLE_CONTENT: 422, // RFC 9110, 15.5.21
  LOCKED: 423, // RFC 4918, 11.3
  FAILED_DEPENDENCY: 424, // RFC 4918, 11.4
  TOO_EARLY: 425, // RFC 8470, 5.2.
  UPGRADE_REQUIRED: 426, // RFC 9110, 15.5.22
  PRECONDITION_REQUIRED: 428, // RFC 6585, 3
  TOO_MANY_REQUESTS: 429, // RFC 6585, 4
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431, // RFC 6585, 5
  UNAVAILABLE_FOR_LEGAL_REASONS: 451, // RFC 7725, 3
  INTERNAL_SERVER_ERROR: 500, // RFC 9110, 15.6.1
  NOT_IMPLEMENTED: 501, // RFC 9110, 15.6.2
  BAD_GATEWAY: 502, // RFC 9110, 15.6.3
  SERVICE_UNAVAILABLE: 503, // RFC 9110, 15.6.4
  GATEWAY_TIMEOUT: 504, // RFC 9110, 15.6.5
  HTTP_VERSION_NOT_SUPPORTED: 505, // RFC 9110, 15.6.6
  VARIANT_ALSO_NEGOTIATES: 506, // RFC 2295, 8.1
  INSUFFICIENT_STORAGE: 507, // RFC 4918, 11.5
  LOOP_DETECTED: 508, // RFC 5842, 7.2
  NOT_EXTENDED: 510, // RFC 2774, 7
  NETWORK_AUTHENTICATION_REQUIRED: 511, // RFC 6585, 6
};

export const httpStatusText = (status) => {
  switch (status) {
    case httpStatus.CONTINUE:
      return "Continue";
    case httpStatus.SWITCHING_PROTOCOLS:
      return "Switching Protocols";
    case httpStatus.PROCESSING:
      return "Processing";
    case httpStatus.EARLY_HINTS:
      return "Early Hints";
    case httpStatus.OK:
      return "OK";
    case httpStatus.CREATED:
      return "Created";
    case httpStatus.ACCEPTED:
      return "Accepted";
    case httpStatus.NON_AUTHORITATIVE_INFO:
      return "Non-Authoritative Information";
    case httpStatus.NO_CONTENT:
      return "No Content";
    case httpStatus.RESET_CONTENT:
      return "Reset Content";
    case httpStatus.PARTIAL_CONTENT:
      return "Partial Content";
    case httpStatus.MULTI_STATUS:
      return "Multi-Status";
    case httpStatus.ALREADY_REPORTED:
      return "Already Reported";
    case httpStatus.IM_USED:
      return "IM Used";
    case httpStatus.MULTIPLE_CHOICES:
      return "Multiple Choices";
    case httpStatus.MOVED_PERMANENTLY:
      return "Moved Permanently";
    case httpStatus.FOUND:
      return "Found";
    case httpStatus.SEE_OTHER:
      return "See Other";
    case httpStatus.NOT_MODIFIED:
      return "Not Modified";
    case httpStatus.USE_PROXY:
      return "Use Proxy";
    case httpStatus.TEMPORARY_REDIRECT:
      return "Temporary Redirect";
    case httpStatus.PERMANENT_REDIRECT:
      return "Permanent Redirect";
    case httpStatus.BAD_REQUEST:
      return "Bad Request";
    case httpStatus.UNAUTHORIZED:
      return "Unauthorized";
    case httpStatus.PAYMENT_REQUIRED:
      return "Payment Required";
    case httpStatus.FORBIDDEN:
      return "Forbidden";
    case httpStatus.NOT_FOUND:
      return "Not Found";
    case httpStatus.METHOD_NOT_ALLOWED:
      return "Method Not Allowed";
    case httpStatus.NOT_ACCEPTABLE:
      return "Not Acceptable";
    case httpStatus.PROXY_AUTH_REQUIRED:
      return "Proxy Authentication Required";
    case httpStatus.REQUEST_TIMEOUT:
      return "Request Timeout";
    case httpStatus.CONFLICT:
      return "Conflict";
    case httpStatus.GONE:
      return "Gone";
    case httpStatus.LENGTH_REQUIRED:
      return "Length Required";
    case httpStatus.PRECONDITION_FAILED:
      return "Precondition Failed";
    case httpStatus.PAYLOAD_TOO_LARGE:
      return "Request Entity Too Large";
    case httpStatus.URI_TOO_LONG:
      return "Request URI Too Long";
    case httpStatus.UNSUPPORTED_MEDIA_TYPE:
      return "Unsupported Media Type";
    case httpStatus.RANGE_NOT_SATISFIABLE:
      return "Requested Range Not Satisfiable";
    case httpStatus.EXPECTATION_FAILED:
      return "Expectation Failed";
    case httpStatus.TEAPOT:
      return "I'm a teapot";
    case httpStatus.MISDIRECTED_REQUEST:
      return "Misdirected Request";
    case httpStatus.UNPROCESSABLE_CONTENT:
      return "Unprocessable Entity";
    case httpStatus.LOCKED:
      return "Locked";
    case httpStatus.FAILED_DEPENDENCY:
      return "Failed Dependency";
    case httpStatus.TOO_EARLY:
      return "Too Early";
    case httpStatus.UPGRADE_REQUIRED:
      return "Upgrade Required";
    case httpStatus.PRECONDITION_REQUIRED:
      return "Precondition Required";
    case httpStatus.TOO_MANY_REQUESTS:
      return "Too Many Requests";
    case httpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE:
      return "Request Header Fields Too Large";
    case httpStatus.UNAVAILABLE_FOR_LEGAL_REASONS:
      return "Unavailable For Legal Reasons";
    case httpStatus.INTERNAL_SERVER_ERROR:
      return "Internal Server Error";
    case httpStatus.NOT_IMPLEMENTED:
      return "Not Implemented";
    case httpStatus.BAD_GATEWAY:
      return "Bad Gateway";
    case httpStatus.SERVICE_UNAVAILABLE:
      return "Service Unavailable";
    case httpStatus.GATEWAY_TIMEOUT:
      return "Gateway Timeout";
    case httpStatus.HTTP_VERSION_NOT_SUPPORTED:
      return "HTTP Version Not Supported";
    case httpStatus.VARIANT_ALSO_NEGOTIATES:
      return "Variant Also Negotiates";
    case httpStatus.INSUFFICIENT_STORAGE:
      return "Insufficient Storage";
    case httpStatus.LOOP_DETECTED:
      return "Loop Detected";
    case httpStatus.NOT_EXTENDED:
      return "Not Extended";
    case httpStatus.NETWORK_AUTHENTICATION_REQUIRED:
      return "Network Authentication Required";
    default:
      return "";
  }
};
