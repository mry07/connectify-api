import "dotenv/config";
import AppServer from "./app/app-server";
import AuthServer from "./app/auth-server";

AppServer.listen(process.env.APP_SERVER_PORT, () => {
  console.log(`App server listening on port ${process.env.APP_SERVER_PORT}`);
});

AuthServer.listen(process.env.AUTH_SERVER_PORT, () => {
  console.log(`Auth server listening on port ${process.env.AUTH_SERVER_PORT}`);
});
