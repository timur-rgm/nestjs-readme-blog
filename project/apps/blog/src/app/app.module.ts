import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/models';

import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [CommentModule, PostModule, PrismaClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
