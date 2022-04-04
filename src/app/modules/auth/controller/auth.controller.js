const { AuthService } = require("../services/auth.service");
const { httpOK, httpException } = require("../../../../core/http");

class AuthController {
  constructor() {
    this.authService = AuthService;
  }

  registerUser = async (req, res) => {
    const createAccountReq = req.body;
    try {
      const loggedInUser = await this.authService.createAccount(
        createAccountReq
      );

      httpOK(res, loggedInUser);
    } catch (err) {
      httpException(res, err, `[AuthController:] cannot create user account`);
    }
  };

  login = async (req, res) => {
    const accountLoginReq = req.body;
    try {
      const loggedInUser = await this.authService.login(accountLoginReq);
      httpOK(res, loggedInUser);
    } catch (err) {
      httpException(res, err, `[AuthController:] cannot login user account`);
    }
  };
}

const AUTH_CONTROLLER = new AuthController();

module.exports = {
  AUTH_CONTROLLER,
};
