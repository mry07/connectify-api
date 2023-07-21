import { RequestHandler } from "express";

const Headers: RequestHandler = (req, res, next) => {
  const appId = req.headers["app-id"];
  const userAgent = req.headers["user-agent"];

  try {
    if (!appId) {
      res.send("Application is running");
      return;
    }

    if (userAgent !== "connectify-app") {
      res.send("Application is running");
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default Headers;
