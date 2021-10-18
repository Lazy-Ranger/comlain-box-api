const { httpException, UnauthorizedException } = require("../http");
const { JwtService } = require("../jwt");

function authorizedToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      throw new UnauthorizedException();
    }

    const user = JwtService.verify(token);

    req.user = user;

    next();
  } catch (err) {
    return httpException(res, new UnauthorizedException());
  }
}

module.exports = { authorizedToken };
