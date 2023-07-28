import Mysql from "mysql2/promise";
import * as Time from "./constants/time.js";

const config: Mysql.PoolOptions = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "my_simple_app",

  // close all of the connections when idle timeout.
  maxIdle: 0,
  idleTimeout: 10 * Time.SECONDS,
};

export const pool = Mysql.createPool(config);
