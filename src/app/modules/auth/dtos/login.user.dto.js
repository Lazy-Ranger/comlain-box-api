const {
  IsEmail,
  IsNotEmpty,
  IsString,
} = require("../../../../core/validators");

const LoginUserDTO = {
  email: {
    type: String,
    validator: [IsNotEmpty, IsEmail],
  },
  password: {
    type: String,
    validator: [IsNotEmpty, IsString],
  },
};

module.exports = { LoginUserDTO };
