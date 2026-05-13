import { Module } from '@nestjs/common';

import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  providers: [CommentRepository, CommentService],
})
export class CommentModule {}
