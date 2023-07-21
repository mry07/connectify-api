import Express from "express";
import UserRoute from "./user-route";
import PostRoute from "./post-route";

const Router = Express.Router();

const routes = [
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path: "/post",
    route: PostRoute,
  },
];

routes.map((e) => Router.use(e.path, e.route));

export default Router;
