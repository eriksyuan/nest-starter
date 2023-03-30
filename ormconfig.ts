import path from 'path';
import fs from 'fs';
import { DataSource } from 'typeorm';
import { parse } from 'yaml';

// 获取项目运行环境
export const getEnv = () => {
  return process.env.NODE_ENV || 'prod';
};

export const getConfig = () => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./config/${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  return config['DATE_BASE'];
};

const { host, username, port, database, password } = getConfig();

const typeOrmConfig = new DataSource({
  type: 'mysql',
  host,
  port,
  database,
  username,
  password,
  entities: [__dirname + '/src/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  synchronize: false,
});

export default typeOrmConfig;
