import Mysql from "mysql2/promise";
import * as Time from "../utils/time.js";

export const Pool = Mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "my_simple_app",

  // close all of the connections after idle timeout.
  maxIdle: 0,
  idleTimeout: 10 * Time.SECONDS,
});
