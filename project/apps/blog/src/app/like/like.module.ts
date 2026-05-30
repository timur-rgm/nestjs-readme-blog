import { Module } from '@nestjs/common';

import { LikeRepository } from './like.repository';

@Module({
  providers: [LikeRepository],
})
export class LikeModule {}
