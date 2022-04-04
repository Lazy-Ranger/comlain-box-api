const { httpException } = require("../../../../core/http");
const { UsersAccountService } = require("../services");
const { httpOK } = require("../../../../core/http");

class UsersAccountController {
  constructor() {
    this.accountService = UsersAccountService;
  }

  changePassword = async (req, res) => {
    const userSession = req.user;
    const updateReq = req.body;

    try {
      await this.accountService.changePassword(userSession._id, updateReq);
      httpOK(res);
    } catch (err) {
      httpException(
        res,
        err,
        `[UserAccountController] cannot update user password`
      );
    }
  };
}

module.exports = new UsersAccountController();
