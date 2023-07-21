import { httpStatus } from "../config/constants/http";

export const httpStatusText = (status: number) => {
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
