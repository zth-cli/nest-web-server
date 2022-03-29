import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';
/**
 * passport策略，验证用户登录是否正确，交给守卫使用
 * local策略主要作用是验证用户密码登录是否正确,然后交由下一步，或者抛出错误
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  // validate 是默认方法
  async validate(username: string, password: string): Promise<any> {
    // 查询用户是否正确登录
    const users = await this.authService.validateUser(username, password);
    if (!users) {
      throw new BadRequestException();
    }
    // 验证成功，会在request上挂载一个user，存储用户信息
    return users;
  }
}
