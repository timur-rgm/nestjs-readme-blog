import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Comment ID',
    example: 'a3e8a9d1-9f3a-4c77-9a5a-5b7d3f2fcd2a',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'This is a comment.',
  })
  @Expose()
  public text!: string;

  @ApiProperty({
    description: 'Comment creation date',
    example: '2026-05-12T18:48:00.000Z',
  })
  @Expose()
  public createdAt!: Date;

  @ApiProperty({
    description: 'Comment update date',
    example: '2026-05-12T18:48:00.000Z',
  })
  @Expose()
  public updatedAt!: Date;

  @ApiProperty({
    description: 'Post ID',
    example: 'f7b67b6f-60f2-4a93-96fd-641c87d419c8',
  })
  @Expose()
  public postId!: string;

  @ApiProperty({
    description: 'Comment author ID',
    example: 'b93d7d8e-5ed7-4494-a0c2-45788f7362f4',
  })
  @Expose()
  public userId!: string;
}
