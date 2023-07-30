import Auth from "../../middlewares/auth.js";
import Routes from "../app-server/routes/index.js";
import Express from "express";
import Headers from "../../middlewares/headers.js";
import * as Path from "path";
import * as Exception from "../../exception/index.js";

const Server = Express();

// middleware
Server.use("/uploads", Express.static(Path.join(process.cwd(), "uploads")));
Server.use(Express.json());
Server.use(Headers);
Server.use(Auth([]));

// route
Server.use("/api/v1", Routes);

// error handler
Server.use(Exception.errorHandler);
Server.use(Exception.errorEndpoint);

export default Server;
