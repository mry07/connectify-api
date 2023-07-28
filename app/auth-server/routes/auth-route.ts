import Auth from "../../../middlewares/auth.js";
import Express from "express";
import Validate from "../../../middlewares/validate.js";
import RateLimit from "express-rate-limit";
import * as Controller from "../controllers/auth-controller.js";
import * as Validation from "../validations/auth-validation.js";
import { login, refreshToken } from "../../../config/rate-limit.js";

const Router = Express.Router();

Router.post(
  "/login",
  Validate(Validation.login),
  RateLimit(login),
  Controller.login
);
Router.delete("/logout", Auth([]), Controller.logout);
Router.post("/register", Validate(Validation.register), Controller.register);
Router.post("/refresh-token", RateLimit(refreshToken), Controller.refreshToken);

export default Router;
