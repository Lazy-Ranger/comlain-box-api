const { Router } = require("express");
const { validateBody } = require("../../../../core/middlewares");
const USERS_ACCOUNT_CONTROLLER = require("../controller/account.controller");
const { UpdatePasswordDTO } = require("../dtos");

const USERS_ACCOUNT_ROUTER = Router();

USERS_ACCOUNT_ROUTER.put(
  "/password",
  validateBody(UpdatePasswordDTO),
  USERS_ACCOUNT_CONTROLLER.changePassword
);

module.exports = {
  USERS_ACCOUNT_ROUTER,
};
