class HttpBaseException {
  constructor(statusCode, objectOrError, description) {
    this.statusCode = statusCode;
    this.description = description;
    this.data = objectOrError;
  }
}

module.exports = { HttpBaseException };
