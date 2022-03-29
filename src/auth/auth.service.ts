import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt'; // 注入JwtService服务，生成token

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  // 根据用户密码，查询用户，local.password调用验证
  async validateUser(username: string, pass: string): Promise<any> {
    const users = await this.userService.findOne(username);
    if (users && users.password === pass) {
      const { password, ...result } = users;
      return result;
    }
    return null;
  }

  //用户正确后,生成token,控制器调用
  async login(user: any): Promise<any> {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
      ...user,
    };
  }
}
