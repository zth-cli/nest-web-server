import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { ArticleModule } from './article/article.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './core/guard/roles.guard';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestweb',
      autoLoadEntities: true, // 自定导入实体类
      // synchronize: true,
    }),
    UserModule,
    TagModule,
    ArticleModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController, AdminController],
  providers: [
    AppService,
    // 全局守卫,数组位置决定执行顺序
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AdminService,
  ],
})
export class AppModule {}
