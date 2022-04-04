function getCollectionName(model) {
  return model.collection.collectionName;
}

function projectionWithIntersection(incomingProjection, defaultProjection) {
  if (!defaultProjection && !Array.isArray(defaultProjection)) {
    return toProjectionFields(incomingProjection);
  }

  const regex = /[\+\-]?/;

  return incomingProjection.reduce((projection, key) => {
    const field = key.replace(regex, "").trim();
    const value = defaultProjection[field];

    if (value !== undefined) {
      key = (value === 0 ? "-" : "+").concat(field);
    }

    projection.push(key);

    return projection;
  }, []);
}

function toProjectionFields(fields = []) {
  return fields
    .reduce((projection, field) => {
      if (field.startsWith("-")) {
        const fname = field.substring(1).trim();

        projection += `-${fname} `;
      } else if (field.match(/\+?.*/)) {
        const fname = field.replace("+", "").trim();

        projection += `+${fname} `;
      }

      return projection;
    }, "")
    .trim();
}

module.exports = {
  getCollectionName,
  toProjectionFields,
  projectionWithIntersection,
};
