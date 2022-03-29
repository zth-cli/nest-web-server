import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { User } from 'src/user/entities/user.entity';
import { Article } from './entities/article.entity';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [TypeOrmModule.forFeature([User, Article])],
})
export class ArticleModule {}
