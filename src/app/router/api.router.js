const { Router } = require("express");
const { AUTH_ROUTER } = require("../modules/auth");
const {
  USERS_ACCOUNT_ROUTER,
  USERS_ROUTER,
  USERS_SEARCH_ROUTER,
} = require("../modules/users");
const { authorizedToken } = require("../../core/middlewares");

const API_ROUTER = Router();

// auth routes
API_ROUTER.use("/auth", AUTH_ROUTER);

// users routes
API_ROUTER.use("/users/search", authorizedToken, USERS_SEARCH_ROUTER);
API_ROUTER.use("/users", authorizedToken, USERS_ROUTER);
API_ROUTER.use("/users", authorizedToken, USERS_ACCOUNT_ROUTER);

module.exports = {
  API_ROUTER,
};
