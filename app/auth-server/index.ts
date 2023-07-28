import Express from "express";
import Headers from "../../middlewares/headers.js";
import Routes from "./routes/index.js";
import * as Error from "../../error/index.js";

const Server = Express();

// middleware
Server.use(Express.json());
Server.use(Headers);

// route
Server.use("/api/v1", Routes);

// error handler
Server.use(Error.handler);
Server.use(Error.endpoint);

export default Server;
