import { parse } from 'yaml';
import path from 'node:path';
import fs from 'node:fs';

// 获取项目运行环境
export const getEnv = () => {
  return process.env.NODE_ENV || 'prod';
};

// 读取项目配置
export const getConfig = () => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./config/${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  return config;
};
