const { Router } = require("express");
const { AUTH_CONTROLLER } = require("../controller/auth.controller");
const { validateBody } = require("../../../../core/middlewares");
const { CreateUserDTO, LoginUserDTO } = require("../dtos");

const AUTH_ROUTER = Router();

AUTH_ROUTER.post(
  "/register",
  validateBody(CreateUserDTO),
  AUTH_CONTROLLER.registerUser
);

AUTH_ROUTER.post("/login", validateBody(LoginUserDTO), AUTH_CONTROLLER.login);

module.exports = {
  AUTH_ROUTER,
};
