const { ForbiddenException, httpException } = require("../http");

function runValidationError(fieldName, fieldValue, validators) {
  const errors = [];
  for (let validator of validators) {
    const { isValid, message, isOptional } = new validator(
      fieldName,
      fieldValue
    );

    if (!fieldValue && isOptional) {
      return errors;
    }

    if (!isValid) {
      errors.push(message);
    }
  }

  return errors;
}

function performConversion(fieldValue, typeToConvert) {
  if (!fieldValue) {
    return fieldValue;
  }
  return new typeToConvert(fieldValue).valueOf();
}

function validateBody(Imodel) {
  return async (req, res, next) => {
    const validationError = {};

    for (pair of Object.entries(Imodel)) {
      const [fieldName, fieldConfig] = pair;
      const fieldValue = req.body[fieldName];
      const errors = runValidationError(
        fieldName,
        fieldValue,
        fieldConfig.validator
      );

      if (errors.length) {
        validationError[fieldName] = errors;
        continue;
      }

      if (fieldValue) {
        req.body[fieldName] = performConversion(fieldValue, fieldConfig.type);
      }
    }

    if (Object.keys(validationError).length) {
      httpException(
        res,
        new ForbiddenException(validationError),
        "Validate Body Error"
      );
    } else {
      next();
    }
  };
}

module.exports = { validateBody };
