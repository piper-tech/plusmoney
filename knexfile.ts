// Update with your config settings.

interface KnexConfig {
  [key: string]: object;
};

const knexConfig: KnexConfig = {

  development: {
    client: "mysql2",
    connection: {
      host : 'database',
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/repositories/implementations/mysql/migrations`
    }
  }

};

export default knexConfig;
