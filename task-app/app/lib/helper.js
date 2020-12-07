exports.response = (data, code = 200, message = '') => {
  return {
    code,
    data,
    message,
  };
};

exports.responseError = (code, message) => {
  return {
    code,
    message,
  };
};

const getConfigValue = (keys, config) => {
  if (typeof keys === 'string' && keys !== null) {
    return config[keys] || null;
  }

  let value;
  for (const key of keys) {
    if (value !== null && typeof value === 'object') {
      value = getConfigValue(key, value);
    } else {
      value = config[key] || null;
    }

    if (!value) {
      return null;
    }
  }

  return value;
};

exports.config = (key) => {
  try {
    if (!key) {
      return null;
    }

    const explodeKey = key.split('.');

    const path = explodeKey.slice(0, 1);
    const keys = explodeKey.slice(1);

    const config = require(`../../config/${path}`);

    if (keys.length <= 0) {
      return config;
    }

    return getConfigValue(keys, config);
  } catch (error) {
    return null;
  }
};

exports.empty = (value) => {
  if (value === null || value === undefined || value === '') {
    return true;
  }

  if (Array.isArray(value) && value.length <= 0) {
    return true;
  }

  return false;
};
