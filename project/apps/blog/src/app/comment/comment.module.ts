import { Module } from '@nestjs/common';

import { CommentRepository } from './comment.repository';

@Module({
  providers: [CommentRepository],
})
export class CommentModule {}
