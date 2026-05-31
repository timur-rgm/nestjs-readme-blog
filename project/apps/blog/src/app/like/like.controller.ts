import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';

import { fillRdo } from '@project/helpers';

import { LikeRdo } from './rdo/like.rdo';
import { LikeService } from './like.service';
import { PostNotFoundError } from '../post/errors';

@Controller()
@ApiTags('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Put('/posts/:postId/like')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been liked.',
    type: LikeRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found.',
  })
  public async like(@Param('postId') postId: string): Promise<LikeRdo> {
    try {
      const entity = await this.likeService.like(postId, 'test-user-id');
      return fillRdo(LikeRdo, entity.convertToObject());
    } catch (error) {
      this.mapErrorToHttp(error);
    }
  }

  @Delete('/posts/:postId/like')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The like has been successfully removed.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found.',
  })
  public async unlike(@Param('postId') postId: string): Promise<void> {
    try {
      await this.likeService.unlike(postId, 'test-user-id');
    } catch (error) {
      this.mapErrorToHttp(error);
    }
  }

  private mapErrorToHttp(error: unknown): never {
    if (error instanceof PostNotFoundError) {
      throw new NotFoundException(error.message);
    }
    throw error;
  }
}
