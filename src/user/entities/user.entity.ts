import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Article } from 'src/article/entities/article.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude() // 查询结果过滤掉此字段
  password: string;

  @Column()
  update_time: number;

  @Column()
  create_time: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  state: number;

  @Column({ default: 'admin' })
  roles: string;

  //  user => tag = 一对多关系
  @OneToMany(() => Tag, (tag) => tag.create_by)
  tags: Tag[];

  //  user => tag = 一对多关系
  @OneToMany(() => Article, (article) => article.create_by)
  articles: Article[];
}
