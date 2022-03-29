import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, retry } from 'rxjs';

// 守卫，主要职责是用来鉴权
@Injectable()
export class RolesGuard implements CanActivate {
  // 白名单, 直接放行
  private urlList: string[] = ['user/login'];

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('进入全局权限守卫...');
    // 获取请求对象
    const request = context.switchToHttp().getRequest();
    // 获取请求头中的token
    const token = context.switchToRpc().getData().headers['Authorization'];
    // 白名单直接放行
    if (this.urlList.includes(request.url)) {
      return true;
    }
    if (token) {
      try {
        // 这里可以添加验证逻辑
        return true;
      } catch (error) {
        throw new HttpException(
          '没有访问权限，请先登录',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        '没有访问权限，请先登录',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
