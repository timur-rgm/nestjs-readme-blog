import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { fillRdo } from '@project/helpers';

import { CommentNotFoundError, CommentOwnershipError } from './errors';
import { CommentRdo } from './rdo/comment.rdo';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostNotFoundError } from '../post/errors';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/comments')
  public async create(@Body() dto: CreateCommentDto): Promise<CommentRdo> {
    const createdEntity = await this.commentService.create(dto, 'test-user-id');
    return fillRdo(CommentRdo, createdEntity.convertToObject());
  }

  @Get('/posts/:postId/comments')
  public async getByPostId(
    @Param('postId') postId: string,
  ): Promise<CommentRdo[]> {
    try {
      const commentEntities = await this.commentService.getByPostId(postId);
      const commentObjects = commentEntities.map((entity) =>
        entity.convertToObject(),
      );
      return fillRdo(CommentRdo, commentObjects);
    } catch (error) {
      this.mapErrorToHttp(error);
    }
  }

  @Delete('/comments/:id')
  public async deleteById(@Param('id') id: string): Promise<void> {
    try {
      await this.commentService.deleteById(id, 'test-user-id');
    } catch (error) {
      this.mapErrorToHttp(error);
    }
  }

  private mapErrorToHttp(error: unknown): never {
    if (error instanceof CommentNotFoundError) {
      throw new NotFoundException(error.message);
    }
    if (error instanceof CommentOwnershipError) {
      throw new ForbiddenException(error.message);
    }
    if (error instanceof PostNotFoundError) {
      throw new NotFoundException(error.message);
    }
    throw error;
  }
}
