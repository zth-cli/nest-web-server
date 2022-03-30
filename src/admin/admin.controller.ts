/*
 * @Author: 阮志雄
 * @Date: 2022-03-29 16:56:35
 * @LastEditTime: 2022-03-30 09:38:37
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \nestjs-web-server\src\admin\admin.controller.ts
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { ArticleService } from 'src/article/article.service';
import { SkipAuth } from 'src/auth/constants';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly articleService: ArticleService,
  ) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  // @Render('index')
  @SkipAuth()
  async findAll(@Res() res: Response) {
    const data = await this.articleService.findAll();
    return res.render('home/index', { data });
  }

  @Get(':id')
  @SkipAuth()
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const list = await this.adminService.findOne(id);
    return res.render('home/article', { list });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
