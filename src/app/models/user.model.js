const { Schema, model } = require("mongoose");
const { hash, compare } = require("bcrypt");
const { BCRYPT_CONFIG } = require("../../config");

const USER_SCHEMA_FIELDS = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phone: {
    type: String,
    required: true,
  },
  picture: String,
  address: String,

  accountType: {
    type: String,
    enum: ["STUDENT", "TEACHER", "ADMIN"],
  },
};

const USER_SCHEMA = new Schema(USER_SCHEMA_FIELDS);

// hooks

USER_SCHEMA.pre("save", async function (next) {
  this.password = await hash(this.password, BCRYPT_CONFIG.ROUNDS);
  next();
});

// methods

USER_SCHEMA.methods.isValidPassword = async function (password) {
  const isMatched = await compare(password, this.password);
  return isMatched;
};

const USERS_COLLECTION = "users";

const USER_MODEL = model(USERS_COLLECTION, USER_SCHEMA);

module.exports = {
  USER_MODEL,
  USERS_COLLECTION,
};
