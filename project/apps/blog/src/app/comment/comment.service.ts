import { Injectable } from '@nestjs/common';

import { CommentEntity } from './comment.entity';
import {
  COMMENT_NOT_FOUND,
  COMMENT_OWNERSHIP_REQUIRED,
} from './comment.constant';
import { CommentNotFoundError, CommentOwnershipError } from './errors';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async create(
    dto: CreateCommentDto,
    userId: string,
  ): Promise<CommentEntity> {
    const entity = new CommentEntity({ ...dto, userId });
    return this.commentRepository.save(entity);
  }

  public async getByPostId(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.findByPostId(postId);
  }

  public async deleteById(id: string, userId: string): Promise<void> {
    const existingEntity = await this.commentRepository.findById(id);

    if (!existingEntity) {
      throw new CommentNotFoundError(COMMENT_NOT_FOUND);
    }

    if (existingEntity.userId !== userId) {
      throw new CommentOwnershipError(COMMENT_OWNERSHIP_REQUIRED);
    }

    await this.commentRepository.deleteById(id);
  }
}
