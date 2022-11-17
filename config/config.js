module.exports = {
  development: {
    username: "admin",
    password: "admin",
    database: "react-redux-express-login_dev",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "react-redux-express-login_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "react-redux-express-login_prod",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
