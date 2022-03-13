const {
  httpException,
  BadRequestException,
  httpOK,
} = require("../../../../core/http");

const { UsersService } = require("../services");

class UsersController {
  constructor() {
    this.usersService = UsersService;
  }

  getUser = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
      return httpException(res, new BadRequestException("User id is empty"));
    }

    try {
      const user = await this.usersService.getUserById(userId);
      httpOK(res, user);
    } catch (err) {
      httpException(res, err, `[UserController:] cannot get user`);
    }
  };

  getSessionUser = async (req, res) => {
    const userSession = req.user;

    try {
      const user = await this.usersService.getUserById(userSession._id);
      httpOK(res, user);
    } catch (err) {
      httpException(res, err, `[UserController]: cannot get session user`);
    }
  };

  deleteUser = async (req, res) => {
    const userSession = req.user;
    try {
      await this.usersService.deleteUserById(userSession._id);
      httpOK(res);
    } catch (err) {
      httpException(res, err, `[UsesController]: cannot delete session user`);
    }
  };

  updateTimeSheet = async (req, res) => {
    const userSession = req.user;
    const updateReq = req.body;

    try {
      await this.usersService.updateTimeSheetById(userSession._id, updateReq);

      httpOK(res);
    } catch (err) {
      httpException(res, err, "[UserController]: cannot update session user");
    }
  };
}

module.exports = new UsersController();
