module.exports = {
  development: {
    username: "padawan",
    password: "padawan",
    database: "bw_nodejs",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
  },
  test: {
    use_env_variable: "DB_URL_SEQUELIZE_POSTGRESQL",
  },
  production: {
    use_env_variable: "DATABASE_URL",
  },
};
