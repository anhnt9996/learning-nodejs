const app = {
  apiVersion: process.env.API_VERSION || 1,
  port: process.env.PORT || 3000,
  salt: process.env.SALT || 8,
  test: {
    test1: 123,
  },
};

module.exports = app;
