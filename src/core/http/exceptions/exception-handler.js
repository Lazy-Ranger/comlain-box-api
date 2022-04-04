const { HttpBaseException } = require("./http-base-exceptions.class");
const { ServiceUnavailableException } = require("./http-exceptions");

function createBody(objectOrError, description, statusCode) {
  if (!objectOrError) {
    return { statusCode, message: description };
  }
  return typeof objectOrError === "object" && !Array.isArray(objectOrError)
    ? objectOrError
    : { statusCode, message: objectOrError, error: description };
}

function httpException(res, exception, message) {
  let isHttpBaseException = false;

  if (exception instanceof HttpBaseException) {
    isHttpBaseException = true;
  }

  if (
    exception instanceof Error ||
    exception instanceof ServiceUnavailableException
  ) {
    console.log(message, exception);
  }

  const preparedException = isHttpBaseException
    ? exception
    : new ServiceUnavailableException();

  const { data, description, statusCode } = preparedException;

  const body = createBody(data, description, statusCode);
  res.statusCode = statusCode;
  res.json(body);
}

module.exports = {
  httpException,
};
