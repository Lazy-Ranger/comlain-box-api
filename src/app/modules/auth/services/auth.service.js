const { UsersAccountService } = require("../../users/services");

const { JwtService } = require("../../../../core/jwt");
const {
  NotFoundException,
  UnauthorizedException,
} = require("../../../../core/http");

class AuthService {
  constructor() {
    this.usersAccountService = UsersAccountService;
  }

  toJWTPayload(user) {
    return {
      _id: user._id,
      email: user.email,
      profile: {
        name: user.name,
        picture: user.picture,
      },
    };
  }

  toUserData(user) {
    const userDoc = user.toJSON();
    delete userDoc.password;
    return userDoc;
  }

  async createAccount(userRegistrationData) {
    const createdUser = await this.usersAccountService.createUser(
      userRegistrationData
    );

    // create session
    return this.createSession(createdUser);
  }

  async login(loginReq) {
    // check Exists + Password Match

    const user = await this.usersAccountService.findUserByEmail(loginReq.email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    // check password matched
    const isPasswordMatched = await user.isValidPassword(loginReq.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException();
    }

    // create session

    return this.createSession(user);
  }

  createSession(user) {
    // token payload prepare
    const jwtPayload = this.toJWTPayload(user);

    // create Token

    const token = JwtService.sign(jwtPayload);

    // response

    return {
      user: this.toUserData(user),
      token,
    };
  }
}

module.exports = { AuthService: new AuthService() };
