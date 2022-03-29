import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptor/response.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { LoggerMiddleware } from './core/middleware/logger.middleware';
import nunjucks = require('nunjucks');
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.setGlobalPrefix('api'); // 设置全局路由前缀
  // 全局中间件
  app.use(new LoggerMiddleware().use);

  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  //注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 静态资源
  app.useStaticAssets(join(__dirname, '..', './public'), {
    prefix: '/static', // 设置虚拟路径
  }); // http://localhost:3200/static/xxx.png

  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // 模板引擎
  const environment = nunjucks.configure('views', {
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: true,
    lstripBlocks: false,
    watch: true,
    noCache: process.env.NODE_ENV === 'development' ? true : false,
    express: app,
  });
  app.engine('html', environment.render);
  app.setViewEngine('html');
  app.set('view cache', true);

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3400, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
