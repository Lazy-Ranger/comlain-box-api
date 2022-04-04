const {
  ServiceUnavailableException,
  BadRequestException,
} = require("../../../core/http");

function handleMongooseValidationError(err) {
  if (!err.name.match("ValidationError")) {
    throw new ServiceUnavailableException();
  }

  const errors = err
    .toString()
    .replace("ValidationError:", "")
    .trim()
    .split(",");

  const responseErrors = {};

  for (const error of errors) {
    let [fieldName, message] = error.split(":");
    message = message.replace(/Path/g, "").trim();

    responseErrors[fieldName] = message;
  }

  throw new BadRequestException({
    message: "Validation errors",
    data: responseErrors,
  });
}

module.exports = {
  handleMongooseValidationError,
};
