import * as fs from 'fs';
import * as path from 'path';
const isProd = process.env.NODE_ENV === 'production';
const DEVELOPMENT = '.development.env';
const PRODUCTION = '.production.env';

function parseEnv() {
  const localEnv = path.resolve(DEVELOPMENT);
  const prodEnv = path.resolve(PRODUCTION);

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }

  const filePath = isProd && fs.existsSync(prodEnv) ? PRODUCTION : DEVELOPMENT;
  return { path: filePath };
}
export default parseEnv();
