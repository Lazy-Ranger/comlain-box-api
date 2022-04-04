// load envs
require("dotenv").config();

// other config ...
global["ROOT_DIR"] = __dirname;

// main app
require("../src/main");
