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
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Put('/posts/:postId/like')
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
