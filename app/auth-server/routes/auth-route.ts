import Auth from "../../../middlewares/auth";
import Express from "express";
import Validate from "../../../middlewares/validate";
import RateLimit from "express-rate-limit";
import * as Controller from "../controllers/auth-controller";
import * as Validation from "../validations/auth-validation";
import { login, refreshToken } from "../../../config/rate-limit";

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
