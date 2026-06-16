import { Module } from '@nestjs/common';

import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  controllers: [LikeController],
  providers: [LikeRepository, LikeService],
})
export class LikeModule {}
