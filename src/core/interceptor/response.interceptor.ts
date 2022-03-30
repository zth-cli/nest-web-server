import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const req = context.switchToHttp().getResponse();
    console.log('进入全局拦截器...');
    return next.handle().pipe(
      map((data) => {
        console.log('返回结果,请求结束!');
        // req.status(200);
        return {
          data,
          code: 0,
          msg: '请求成功',
        };
      }),
    );
  }
}
/*
拦截器作用
在函数执行之前/之后绑定额外的逻辑
转换从函数返回的结果
转换从函数抛出的异常
扩展基本函数行为
根据所选条件完全重写函数 (例如, 缓存目的)
*/
