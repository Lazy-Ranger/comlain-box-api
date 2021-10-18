module.exports = {
  ...require("./authorized-token.middleware"),
  ...require("./validate-body.middleware"),
};
