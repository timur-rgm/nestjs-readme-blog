import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/models';

import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [CommentModule, LikeModule, PostModule, PrismaClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
