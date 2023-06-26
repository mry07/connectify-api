import DevError from "../error/dev-error.js";
import TokenError from "../error/token-error.js";
import JsonWebToken from "jsonwebtoken";
import { errorTypes } from "../config/constants/error.js";
import { httpStatus } from "../config/constants/http.js";

const Auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        throw new DevError(httpStatus.UNAUTHORIZED, "missing_parameter");
      }

      const decoded = JsonWebToken.verify(token, process.env.TOKEN_SECRET);

      // check if user has required role
      if (roles.length && !roles.includes(decoded.role)) {
        throw new DevError(httpStatus.UNAUTHORIZED, "invalid_role");
      }

      req.jwt = decoded;

      next();
    } catch (error) {
      if (error.errorType === errorTypes.DEV_ERROR) {
        next(error);
      } else {
        next(new TokenError(error));
      }
    }
  };
};

export default Auth;
