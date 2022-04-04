const { Router } = require("express");
const { validateBody } = require("../../../../core/middlewares");
const USERS_CONTROLLER = require("../controller/users.controller");
const { UserUpdateDTO } = require("../dtos");

const USERS_ROUTER = Router();

USERS_ROUTER.get("/profile", USERS_CONTROLLER.getSessionUser);
USERS_ROUTER.get("/:userId", USERS_CONTROLLER.getUser);

USERS_ROUTER.put(
  "/",
  validateBody(UserUpdateDTO),
  USERS_CONTROLLER.updateUsers
);

USERS_ROUTER.delete("/", USERS_CONTROLLER.deleteUser);

module.exports = {
  USERS_ROUTER,
};
