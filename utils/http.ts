import * as HttpStatus from "../config/constants/http-status";

export const httpStatusText = (status: number) => {
  switch (status) {
    case HttpStatus.CONTINUE:
      return "Continue";
    case HttpStatus.SWITCHING_PROTOCOLS:
      return "Switching Protocols";
    case HttpStatus.PROCESSING:
      return "Processing";
    case HttpStatus.EARLY_HINTS:
      return "Early Hints";
    case HttpStatus.OK:
      return "OK";
    case HttpStatus.CREATED:
      return "Created";
    case HttpStatus.ACCEPTED:
      return "Accepted";
    case HttpStatus.NON_AUTHORITATIVE_INFO:
      return "Non-Authoritative Information";
    case HttpStatus.NO_CONTENT:
      return "No Content";
    case HttpStatus.RESET_CONTENT:
      return "Reset Content";
    case HttpStatus.PARTIAL_CONTENT:
      return "Partial Content";
    case HttpStatus.MULTI_STATUS:
      return "Multi-Status";
    case HttpStatus.ALREADY_REPORTED:
      return "Already Reported";
    case HttpStatus.IM_USED:
      return "IM Used";
    case HttpStatus.MULTIPLE_CHOICES:
      return "Multiple Choices";
    case HttpStatus.MOVED_PERMANENTLY:
      return "Moved Permanently";
    case HttpStatus.FOUND:
      return "Found";
    case HttpStatus.SEE_OTHER:
      return "See Other";
    case HttpStatus.NOT_MODIFIED:
      return "Not Modified";
    case HttpStatus.USE_PROXY:
      return "Use Proxy";
    case HttpStatus.TEMPORARY_REDIRECT:
      return "Temporary Redirect";
    case HttpStatus.PERMANENT_REDIRECT:
      return "Permanent Redirect";
    case HttpStatus.BAD_REQUEST:
      return "Bad Request";
    case HttpStatus.UNAUTHORIZED:
      return "Unauthorized";
    case HttpStatus.PAYMENT_REQUIRED:
      return "Payment Required";
    case HttpStatus.FORBIDDEN:
      return "Forbidden";
    case HttpStatus.NOT_FOUND:
      return "Not Found";
    case HttpStatus.METHOD_NOT_ALLOWED:
      return "Method Not Allowed";
    case HttpStatus.NOT_ACCEPTABLE:
      return "Not Acceptable";
    case HttpStatus.PROXY_AUTH_REQUIRED:
      return "Proxy Authentication Required";
    case HttpStatus.REQUEST_TIMEOUT:
      return "Request Timeout";
    case HttpStatus.CONFLICT:
      return "Conflict";
    case HttpStatus.GONE:
      return "Gone";
    case HttpStatus.LENGTH_REQUIRED:
      return "Length Required";
    case HttpStatus.PRECONDITION_FAILED:
      return "Precondition Failed";
    case HttpStatus.PAYLOAD_TOO_LARGE:
      return "Request Entity Too Large";
    case HttpStatus.URI_TOO_LONG:
      return "Request URI Too Long";
    case HttpStatus.UNSUPPORTED_MEDIA_TYPE:
      return "Unsupported Media Type";
    case HttpStatus.RANGE_NOT_SATISFIABLE:
      return "Requested Range Not Satisfiable";
    case HttpStatus.EXPECTATION_FAILED:
      return "Expectation Failed";
    case HttpStatus.TEAPOT:
      return "I'm a teapot";
    case HttpStatus.MISDIRECTED_REQUEST:
      return "Misdirected Request";
    case HttpStatus.UNPROCESSABLE_CONTENT:
      return "Unprocessable Entity";
    case HttpStatus.LOCKED:
      return "Locked";
    case HttpStatus.FAILED_DEPENDENCY:
      return "Failed Dependency";
    case HttpStatus.TOO_EARLY:
      return "Too Early";
    case HttpStatus.UPGRADE_REQUIRED:
      return "Upgrade Required";
    case HttpStatus.PRECONDITION_REQUIRED:
      return "Precondition Required";
    case HttpStatus.TOO_MANY_REQUESTS:
      return "Too Many Requests";
    case HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE:
      return "Request Header Fields Too Large";
    case HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS:
      return "Unavailable For Legal Reasons";
    case HttpStatus.INTERNAL_SERVER_ERROR:
      return "Internal Server Error";
    case HttpStatus.NOT_IMPLEMENTED:
      return "Not Implemented";
    case HttpStatus.BAD_GATEWAY:
      return "Bad Gateway";
    case HttpStatus.SERVICE_UNAVAILABLE:
      return "Service Unavailable";
    case HttpStatus.GATEWAY_TIMEOUT:
      return "Gateway Timeout";
    case HttpStatus.HTTP_VERSION_NOT_SUPPORTED:
      return "HTTP Version Not Supported";
    case HttpStatus.VARIANT_ALSO_NEGOTIATES:
      return "Variant Also Negotiates";
    case HttpStatus.INSUFFICIENT_STORAGE:
      return "Insufficient Storage";
    case HttpStatus.LOOP_DETECTED:
      return "Loop Detected";
    case HttpStatus.NOT_EXTENDED:
      return "Not Extended";
    case HttpStatus.NETWORK_AUTHENTICATION_REQUIRED:
      return "Network Authentication Required";
    default:
      return "";
  }
};
