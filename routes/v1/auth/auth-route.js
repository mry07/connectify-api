import Auth from "../../../middleware/auth.js";
import Express from "express";
import Limiter from "../../../middleware/limiter.js";
import Validate from "../../../middleware/validate.js";
import * as Time from "../../../utils/time.js";
import * as Controller from "../../../controllers/auth-controller.js";
import * as Validation from "../../../validations/auth-validation.js";

const Router = Express.Router();

Router.post(
  "/auth/login",
  Validate(Validation.login),
  Limiter({ timeout: 5 * Time.MINUTES, max: 5 }),
  Controller.login
);
Router.delete("/auth/logout", Auth(), Controller.logout);
Router.post(
  "/auth/register",
  Validate(Validation.register),
  Controller.register
);
Router.post("/auth/refresh-token", Controller.refreshToken);

export default Router;
