const { BaseValidationClass } = require("./base-validation.class");
const { isEmail, isEmpty, isLength, isMobilePhone } = require("validator");

function normalizedToString(data) {
  if (!data) {
    return "";
  }
  data = data && typeof data !== "string" ? new String(data) : data;
  return data;
}

class IsString extends BaseValidationClass {
  constructor(fieldName, data) {
    super(fieldName, data);
    this.message = `${fieldName} must be a string`;
    this.isOptional = false;
    this.init();
  }

  init() {
    this.isValid = typeof this.data == "string";
  }
}

class IsEmail extends BaseValidationClass {
  constructor(fieldName, data) {
    super(fieldName, data);
    this.message = `${fieldName} must be a Email`;
    this.isOptional = false;
    this.init();
  }
  init() {
    this.isValid = isEmail(this.data);
  }
}

class IsPhoneNumber extends BaseValidationClass {
  constructor(fieldName, data) {
    super(fieldName, data);
    this.message = `${fieldName} must be a Mobile number`;
    this.isOptional = false;
    this.init();
  }
  init() {
    this.isValid = isMobilePhone(normalizedToString(this.data));
  }
}

class IsNotEmpty extends BaseValidationClass {
  constructor(fieldName, data) {
    super(fieldName, data);
    this.message = `${fieldName} must not be empty`;
    this.isOptional = false;
    this.init();
  }
  init() {
    this.isValid = isLength(this.data, { ignore_whitespace: true });
  }
}

class IsOptional extends BaseValidationClass {
  constructor(fieldName, data) {
    super(fieldName, data);
    this.isValid = true;
    this.isOptional = true;
  }
}

module.exports = {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
  IsString,
};
