import { configDotenv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
configDotenv();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  synchronize: false,
  logging: false,
  entities: [],
  migrations: [],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
