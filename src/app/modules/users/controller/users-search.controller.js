const { httpException, httpOK } = require("../../../../core/http");
const { PaginationQuery } = require("../../../../infra/mongoose");

const { UsersSearchService } = require("../services");

class UsersSearchController {
  constructor() {
    this.usersSearchService = UsersSearchService;
  }

  searchUsers = async (req, res) => {
    const query = new PaginationQuery(req.query);

    try {
      const page = await this.usersSearchService.search(query);

      httpOK(res, page);
    } catch (err) {
      httpException(res, err, `[UsersSearchController:] cannot search users`);
    }
  };
}

module.exports = new UsersSearchController();
