import Multer from "multer";
import Express from "express";
import Validate from "../../../middlewares/validate";
import * as Controller from "../controllers/post-controller";
import * as Validation from "../validations/post-validation";

const Router = Express.Router();
const upload = Multer({ dest: "uploads/" });

Router.post("/new-post", upload.array("images", 3), Controller.newPost);
Router.post("/get-posts", Controller.getPosts);
Router.post("/like-dislike", Controller.likeDislike);
Router.post("/comment", Validate(Validation.comment), Controller.comment);
Router.post("/get-comments", Controller.getComments);

export default Router;
