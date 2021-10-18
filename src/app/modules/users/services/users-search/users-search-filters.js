class UsersSearchFilters {
  constructor(query) {
    this.filters = query.filters;
  }

  getAccountTypeQuery() {
    const { accountType } = this.filters;

    if (!accountType) {
      return {};
    }

    const accountTypes = Array.isArray(accountType)
      ? accountType
      : [accountType];

    return { accountType: { $in: accountTypes.map((at) => at.toUpperCase()) } };
  }

  getAddressQuery() {
    const { address } = this.filters;

    if (!address) {
      return {};
    }

    return { address: { $regex: address.trim(), $options: "i" } };
  }
}

module.exports = {
  UsersSearchFilters,
};
