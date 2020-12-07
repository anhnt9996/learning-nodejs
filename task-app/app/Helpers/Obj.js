const { empty } = require('../lib/helper');

class Obj {
  static only(object, keys) {
    if (empty(object) || empty(keys)) {
      return {};
    }

    let result = {};
    if (typeof keys === 'string') {
      return (result[keys] = object[keys] || {});
    }

    keys.forEach((key) => {
      if (object[key]) {
        result[key] = object[key];
      }
    });

    return result;
  }
}

module.exports = Obj;
