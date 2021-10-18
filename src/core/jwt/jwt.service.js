const { JWT_CONFIG } = require("../../config");
const jwt = require("jsonwebtoken");

class JwtService {
  static sign(payload) {
    try {
      const token = jwt.sign(payload, JWT_CONFIG.SECRET, {
        expiresIn: JWT_CONFIG.EXPIRE_TIME,
      });

      return token;
    } catch (err) {
      console.log(`[JwtService] : cannot sign data`);
    }
  }

  static verify(token) {
    try {
      const payload = jwt.verify(token, JWT_CONFIG.SECRET);
      return payload;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = { JwtService };
