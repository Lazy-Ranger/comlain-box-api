const express = require("express");
const morgan = require("morgan");
const { APP_CONFIG } = require("../config");
const { API_ROUTER } = require("./router");
const { DatabaseConnection } = require("../infra/mongoose");

class ExpressApp {
  constructor() {
    this.app = express();
  }

  async start() {
    await DatabaseConnection.connect();

    this.app.use(morgan(APP_CONFIG.LOGGER_TYPE));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(API_ROUTER);

    this.app.listen(APP_CONFIG.PORT, () => {
      console.log(`App is listening on ${APP_CONFIG.PORT}`);
    });
  }
}
module.exports = ExpressApp;
