import DevError from "../errors/dev-error.js";
import { httpStatus } from "../utils/http-status.js";

const HttpHeaders = (req, res, next) => {
  const appId = req.headers["app-id"];

  try {
    // error missing App-Id
    if (!appId) {
      throw new DevError(httpStatus.BAD_REQUEST, "missing_parameter");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default HttpHeaders;
