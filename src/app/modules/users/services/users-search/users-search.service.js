const {
  Paginable,
  projectionWithIntersection,
} = require("../../../../../infra/mongoose");
const { removeBlankObjects } = require("../../../../../utils");
const { USER_MODEL } = require("../../../../models");
const { UsersSearchFilters } = require("./users-search-filters");

class UsersSearchService {
  constructor() {
    this.paginable = new Paginable(USER_MODEL);
  }

  _transformations(resultPage) {
    resultPage.data.forEach((user) => {
      //   user.name = user.toUpperCase();
    });

    return resultPage;
  }

  _buildSearchQuery(query) {
    const search = query.search;

    if (!search || !search.trim().length) {
      return {};
    }

    const regex = { $regex: search.trim(), $options: "i" }; // search=ji ajit jit JIT AJIT

    return {
      $or: [{ email: regex }, { name: regex }],
    };
  }

  _buildFiltersQuery(query) {
    const filtersInstance = new UsersSearchFilters(query);

    const filters = {
      address: filtersInstance.getAddressQuery(),
      accountType: filtersInstance.getAccountTypeQuery(),
    };

    return removeBlankObjects(filters);
  }

  _buildProjection(query) {
    const defaultProjection = { password: 0, _id: 1 };

    return projectionWithIntersection(query.fields, defaultProjection);
  }

  async search(query) {
    const findQuery = {
      $and: [],
    };

    // search text query
    const textQuery = this._buildSearchQuery(query);
    findQuery.$and.push(textQuery);

    // filters query
    const filtersQuery = this._buildFiltersQuery(query);
    findQuery.$and.push(filtersQuery);

    // projection
    const projection = this._buildProjection(query);

    // populate
    const populate = [];

    // final query plan
    const queryOptions = { searchQuery: findQuery, projection, populate };

    const resultPage = await this.paginable.getPage(
      queryOptions,
      query.pageOptions
    );

    // transformations (if any)
    return this._transformations(resultPage);
  }
}

module.exports = {
  UsersSearchService: new UsersSearchService(),
};
