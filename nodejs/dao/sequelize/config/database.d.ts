declare var DatabaseConfig: {
  development: {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
  };
  test: {
    use_env_variable: string;
  };
  production: {
    use_env_variable: string;
  };
};

export = DatabaseConfig;
