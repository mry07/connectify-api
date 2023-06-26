import Auth from "../../../middleware/auth.js";
import Express from "express";
import * as Controller from "../../../controllers/user-controller.js";

const Router = Express.Router();

Router.post("/details", Auth(), Controller.details);
Router.post("/follow", Auth(), Controller.follow);

export default Router;
