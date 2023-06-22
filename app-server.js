import Path from "node:path";
import Express from "express";
import AppRoutes from "./routes/v1/app/index.js";
import HttpHeaders from "./middlewares/http-headers.js";
import * as Dotenv from "dotenv";
import * as Errors from "./errors/error-handler.js";
import { fileURLToPath } from "url";

const app = Express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

Dotenv.config();

// middleware
app.use(Express.json());

// api routes
app.use("/uploads", Express.static(Path.join(__dirname, "uploads")));
app.use("/api/v1", HttpHeaders, AppRoutes);

// error handler
app.use(Errors.errorHandler);
app.use(Errors.endpointError);

// listen
app.listen(process.env.APP_SERVER_PORT, () => {
  console.log(`Application server is now running`);
});
