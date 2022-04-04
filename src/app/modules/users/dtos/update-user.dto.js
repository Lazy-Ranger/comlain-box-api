const {
  IsEmail,
  IsOptional,
  IsString,
} = require("../../../../core/validators");

const UserUpdateDTO = {
  name: {
    type: String,
    validator: [IsOptional, IsString],
  },
  email: {
    type: String,
    validator: [IsOptional, IsEmail],
  },
  phone: {
    type: String,
    validator: [IsOptional, IsString],
  },
  address: {
    type: String,
    validator: [IsOptional, IsString],
  },
};

module.exports = {
  UserUpdateDTO,
};
