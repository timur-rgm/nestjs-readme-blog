import { Module } from '@nestjs/common';

import { PostController } from './post.controller';
import { PostMessageController } from './post-message.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  controllers: [PostController, PostMessageController],
  providers: [PostService, PostRepository],
  exports: [PostService],
})
export class PostModule {}
