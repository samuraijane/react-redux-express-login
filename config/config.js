const {
  PG_DATABASE,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_USER
} = process.env;

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
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    host: PG_HOST,
    dialect: "postgres"
  }
};
