const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET,
  EXPIRE_TIME: process.env.EXPIRE_TIME,
};

module.exports = {
  JWT_CONFIG,
};
