const response = (data, code = 200, message = '') => {
  return {
    code,
    data,
    message,
  };
};

const responseError = (code, message) => {
  return {
    code,
    message,
  };
};
