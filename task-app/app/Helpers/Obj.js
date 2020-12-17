const { empty } = require('../lib/helper');

class Obj {
  only(object, keys) {
    if (empty(object) || empty(keys)) {
      return {};
    }

    let result = {};
    const parseKeys = this._changeKeyName(keys);
    if (typeof keys === 'string') {
      return (result[parseKeys.parsedName] = object[parseKeys.name] || {});
    }

    parseKeys.forEach((key) => {
      if (!empty(object[key.name].toString())) {
        result[key.parsedName] = object[key.name];
      }
    });

    return result;
  }

  except(object, keys) {
    if (empty(object) || empty(keys)) {
      return {};
    }

    if (typeof keys === 'string') {
      delete object[keys];
      return object;
    }

    keys.forEach((key) => {
      if (object[key]) {
        delete object[key];
      }
    });

    return object;
  }

  _changeKeyName(keys) {
    if (typeof keys === 'string') {
      const explodeKey = keys.split(':');

      return {
        name: explodeKey[0],
        parsedName: explodeKey[1] || explodeKey[0],
      };
    }

    return keys.map((key) => {
      const explodeKey = key.split(':');

      return {
        name: explodeKey[0],
        parsedName: explodeKey[1] || explodeKey[0],
      };
    });
  }
}

module.exports = new Obj();
