import Express from "express";
import * as Controller from "../controllers/user-controller.js";

const Router = Express.Router();

Router.post("/details", Controller.details);
Router.post("/follow-unfollow", Controller.followUnfollow);
Router.get("/get-posts", Controller.getPosts);

export default Router;
