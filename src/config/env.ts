/*
 * @Author: 阮志雄
 * @Date: 2022-04-03 22:03:38
 * @LastEditTime: 2022-04-03 22:06:50
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \nestjs-web-server\src\config\env.ts
 */
import * as fs from 'fs';
import * as path from 'path';
const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  const localEnv = path.resolve('.env.development');
  const prodEnv = path.resolve('.env.production');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }

  const filePath = isProd && fs.existsSync(prodEnv) ? '.env.production' : '.env.development';
  return { path: filePath };
}
export default parseEnv();
