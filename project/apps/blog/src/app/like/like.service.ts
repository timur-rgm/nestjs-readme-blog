import { Injectable } from '@nestjs/common';

import { LikeEntity } from './like.entity';
import { LikeRepository } from './like.repository';
import { PostService } from '../post/post.service';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly postService: PostService,
  ) {}

  public async like(postId: string, userId: string): Promise<LikeEntity> {
    await this.postService.ensureExists(postId);
    const existingEntity = await this.likeRepository.findByPostIdAndUserId(
      postId,
      userId,
    );
    if (existingEntity) {
      return existingEntity;
    }
    const newEntity = new LikeEntity({ postId, userId });
    return this.likeRepository.save(newEntity);
  }

  public async unlike(postId: string, userId: string): Promise<void> {
    await this.postService.ensureExists(postId);
    const existingEntity = await this.likeRepository.findByPostIdAndUserId(
      postId,
      userId,
    );
    if (!existingEntity) {
      return;
    }
    return this.likeRepository.deleteByPostIdAndUserId(postId, userId);
  }
}
