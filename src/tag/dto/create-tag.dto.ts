import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';
export class CreateTagDto {
  @ApiProperty({ example: '小白' })
  @IsString({ message: '必须是字符串' })
  name: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  state: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  createById: number;
}
