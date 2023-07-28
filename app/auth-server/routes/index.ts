import Express from "express";
import AuthRoute from "./auth-route.js";

const Router = Express.Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
];

routes.map((e) => Router.use(e.path, e.route));

export default Router;
