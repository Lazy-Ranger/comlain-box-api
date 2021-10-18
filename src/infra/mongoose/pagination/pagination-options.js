class PaginationOptions {
  constructor(props) {
    props = props || {};

    this.limit = props?.limit || 10;
    this.page = props?.page || 1;
    this.sortBy = props?.sortBy || "_id";
    this.orderBy = props?.orderBy || -1;
  }

  static defaultOptions() {
    return new PaginationOptions();
  }

  static getPageOptions(options) {
    let { limit, page, sortBy, orderBy } = new PaginationOptions(options);

    try {
      limit = +limit;
      page = +page;
    } catch (err) {
      limit = 10;
      page = 1;
    }

    if (limit < 1) {
      limit = 10;
    }

    if (page < 1) {
      page = 1;
    }

    const skip = page === 1 ? 0 : limit * (page - 1);

    return {
      limit,
      page,
      sortBy,
      orderBy,
      skip,
    };
  }
}

class PaginationQuery extends PaginationOptions {
  constructor(props) {
    super(props);

    props = props || {};

    this.search = props?.search || "";
    this.filters = props?.filters || {};
    this.fields = props?.fields || []; // projection
  }

  get pageOptions() {
    return PaginationOptions.getPageOptions(this);
  }
}

module.exports = {
  PaginationQuery,
  PaginationOptions,
};
