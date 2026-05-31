import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @Expose()
  @ApiProperty({
    description: 'Like ID',
    example: 'a3e8a9d1-9f3a-4c77-9a5a-5b7d3f2fcd2a',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'Like creation date',
    example: '2026-05-12T18:48:00.000Z',
  })
  public createdAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Like update date',
    example: '2026-05-12T18:48:00.000Z',
  })
  public updatedAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Post ID',
    example: 'f7b67b6f-60f2-4a93-96fd-641c87d419c8',
  })
  public postId!: string;

  @Expose()
  @ApiProperty({
    description: 'Like author ID',
    example: 'b93d7d8e-5ed7-4494-a0c2-45788f7362f4',
  })
  public userId!: string;
}
