import DevError from "../error/dev-error.js";
import { httpStatus } from "../config/constants/http.js";

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
