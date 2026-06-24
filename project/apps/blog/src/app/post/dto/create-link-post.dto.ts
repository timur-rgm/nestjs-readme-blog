import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl, Matches,
  MaxLength, MinLength
} from 'class-validator';

import { PostType } from '@project/types';

export class CreateLinkPostDto {
  @IsEnum(PostType)
  @ApiProperty({
    description: 'Post type',
    example: PostType.Link,
    enum: PostType,
  })
  public type!: PostType.Link;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(8)
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(10, { each: true })
  @Matches(/^\p{L}/u, { each: true })
  @ApiProperty({
    description: 'Post tags',
    example: ['nestjs', 'blog'],
    required: false,
    isArray: true,
  })
  public tags?: string[];

  @IsUrl()
  @ApiProperty({
    description: 'Link URL',
    example: 'https://example.com',
  })
  public linkUrl!: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  @ApiProperty({
    description: 'Link description',
    example: 'Short description',
  })
  public description?: string;
}
