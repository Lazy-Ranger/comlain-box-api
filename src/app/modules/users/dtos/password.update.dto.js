const { IsNotEmpty, IsString } = require("../../../../core/validators");

const UpdatePasswordDTO = {
  oldPassword: {
    type: String,
    validator: [IsNotEmpty, IsString],
  },
  newPassword: {
    type: String,
    validator: [IsNotEmpty, IsString],
  },
};

module.exports = {
  UpdatePasswordDTO,
};
