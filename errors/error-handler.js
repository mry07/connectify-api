import { errorTypes } from "./error-constant.js";
import { httpStatus } from "../utils/http-status.js";

export const errorHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.errorType) {
    case errorTypes.API_ERROR:
      res.status(err.httpCode).send({
        status: err.errorType,
        message: err.message,
      });
    case errorTypes.DEV_ERROR:
    case errorTypes.TOKEN_ERROR:
      res.status(err.httpCode).send({
        status: err.errorType,
        error_code: err.errorCode,
        message: err.message,
      });
      break;
    case errorTypes.VALIDATION_ERROR:
      res.status(err.httpCode).send({
        status: err.errorType,
        errors: err.errors,
      });
      break;
    default:
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        status: errorTypes.API_ERROR,
        message: "Terjadi kesalahan pada server",
      });
      break;
  }
};

export const endpointError = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).send({
    status: errorTypes.DEV_ERROR,
    message: "Pastikan method atau endpoint sudah benar",
  });
};
