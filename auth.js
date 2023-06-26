// import Cors from "cors";
import Express from "express";
import AuthRoute from "./routes/v1/auth/auth-route.js";
import HttpHeaders from "./middleware/http-headers.js";
import * as Error from "./error/index.js";
import * as Dotenv from "dotenv";

Dotenv.config();
const app = Express();

// middleware
app.use(Express.json());

// routes
app.use("/api/v1", HttpHeaders, AuthRoute);

// error handler
app.use(Error.handler);
app.use(Error.endpointError);

// listen
app.listen(process.env.AUTH_SERVER_PORT, () => {
  console.log(`Authentication server is now running`);
});
