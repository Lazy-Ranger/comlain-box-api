const { Router } = require("express");
const USERS_SEARCH_CONTROLLER = require("../controller/users-search.controller");

const USERS_SEARCH_ROUTER = Router();

USERS_SEARCH_ROUTER.get("/", USERS_SEARCH_CONTROLLER.searchUsers);

module.exports = {
  USERS_SEARCH_ROUTER,
};
