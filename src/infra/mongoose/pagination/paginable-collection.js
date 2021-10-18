const { Page } = require("./page");
const { PaginationOptions } = require("./pagination-options");

const {
  handleMongooseValidationError,
  getCollectionName,
} = require("../utils");

class Paginable {
  constructor(model) {
    this.model = model;
    this.collectionName = getCollectionName(this.model);
  }

  async getPage(modelQueryOptions, paginationOptions) {
    // set pagination limit and page
    const { limit, page, sortBy, orderBy, skip } =
      PaginationOptions.getPageOptions(paginationOptions);

    // set pagination sort and order
    const sortAndOrderQuery = {
      [sortBy]: orderBy,
    };

    const {
      searchQuery = {},
      projection = {},
      populate = [],
    } = modelQueryOptions || {};

    try {
      // execute the query
      const data = await this.model
        .find(searchQuery)
        .populate(populate)
        .select(projection)
        .skip(skip)
        .limit(limit)
        .sort(sortAndOrderQuery)
        .lean(); // document that can be edited

      // get record size
      const recordsSize = await this.model.countDocuments().exec();

      return new Page(page, limit, data, recordsSize);
    } catch (err) {
      console.log(
        `[Pagination]: Cannot find ${this.collectionName} list error`,
        err
      );
      handleMongooseValidationError(err);
    }
  }
}

module.exports = {
  Paginable,
};
