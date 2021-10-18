const { USER_MODEL } = require("../../../models");
const { NotFoundException } = require("../../../../core/http");

class UsersService {
  constructor() {
    this.userModel = USER_MODEL;
  }

  async getUserById(userId) {
    // check if user is exits
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async deleteUserById(userId) {
    const isUserDelete = await this.userModel.findOneAndDelete({ _id: userId });
    if (!isUserDelete) {
      throw new NotFoundException("User not found");
    }
  }

  async updateUserById(userId, updateReq) {
    if (updateReq.password) {
      delete updateReq.password;
    }

    const isUpdate = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $set: updateReq }
    );

    if (!isUpdate) {
      throw new NotFoundException("User not found");
    }
  }
}

module.exports = {
  UsersService: new UsersService(),
};
