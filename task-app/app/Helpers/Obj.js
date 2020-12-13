const { empty } = require('../lib/helper');

class Obj {
  static only(object, keys) {
    if (empty(object) || empty(keys)) {
      return {};
    }

    let result = {};
    const parseKeys = objRef.changeKeyName(keys);
    if (typeof keys === 'string') {
      return (result[parseKeys.parsedName] = object[parseKeys.name] || {});
    }

    parseKeys.forEach((key) => {
      if (object[key.name]) {
        result[key.parsedName] = object[key.name];
      }
    });
    return result;
  }

  static except(object, keys) {
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
}

Obj.prototype.changeKeyName = (keys) => {
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
};

const objRef = new Obj();

module.exports = Obj;
