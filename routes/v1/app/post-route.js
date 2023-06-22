import Auth from "../../../middlewares/auth.js";
import Multer from "multer";
import Express from "express";
import Validate from "../../../middlewares/validate.js";
import * as Controller from "../../../controllers/post-controller.js";
import * as Validation from "../../../validations/post-validation.js";

const Router = Express.Router();
const upload = Multer({ dest: "uploads/" });

Router.post("/new-post", Auth(), upload.array("images", 3), Controller.newPost);
Router.post("/get-posts", Auth(), Controller.getPosts);
Router.post("/liked-disliked", Auth(), Controller.likeDislike);
Router.post(
  "/comment",
  Validate(Validation.comment),
  Auth(),
  Controller.comment
);
Router.post("/get-comments", Auth(), Controller.getComments);

export default Router;
