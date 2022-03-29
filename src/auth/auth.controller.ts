import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { Role } from 'src/core/constants/role.enum';
import { Roles } from 'src/core/decorators/roles.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   1.守卫 首先验证登录用户是否正确
   2.正确逻辑交给控制器
   3.生成token
   */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  //  'admin'用户才有权限访问， 全局RolesGuard守卫
  @Roles(Role.Admin)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  // 'user'用户才能访问
  @Roles(Role.User)
  @Get('ps')
  getPs(@Req() req) {
    return req.user;
  }
}
