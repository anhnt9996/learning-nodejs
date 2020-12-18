const { empty, config } = require('../lib/helper');

class PaginateService {
  static getSkip(page, limit = config('app.paginate.limit')) {
    if (empty(page)) {
      return 0;
    }

    return limit * (parseInt(page) - 1);
  }

  static getLimit(limit) {
    return parseInt(limit) || config('app.paginate.limit');
  }
}

module.exports = PaginateService;
