import { Module } from '@nestjs/common';

import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  providers: [LikeRepository, LikeService],
})
export class LikeModule {}
