import Express from "express";
import Headers from "../../middlewares/headers.js";
import Routes from "./routes/index.js";
import * as Exception from "../../exception/index.js";

const Server = Express();

// middleware
Server.use(Express.json());
Server.use(Headers);

// route
Server.use("/api/v1", Routes);

// error handler
Server.use(Exception.errorHandler);
Server.use(Exception.errorEndpoint);

export default Server;
