function removeBlankObjects(target) {
  return Object.entries(target).reduce((newTarget, [key, value]) => {
    if (!value || (typeof value === "object" && !Object.keys(value).length)) {
      return newTarget;
    } else {
      Object.assign(newTarget, value);
    }

    return newTarget;
  }, {}); // {}
}

module.exports = {
  removeBlankObjects,
};
