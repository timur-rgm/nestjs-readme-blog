import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { fillRdo } from '@project/helpers';
import { RabbitRoutingKey } from '@project/types';

import { PostRdo } from './rdo';
import { PostService } from './post.service';

@Controller()
export class PostMessageController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern(RabbitRoutingKey.GetPostsCreatedAfter)
  public async getCreatedAfter(date: Date): Promise<PostRdo[]> {
    const postEntities = await this.postService.getCreatedAfter(date);
    return fillRdo(
      PostRdo,
      postEntities.map((postEntity) => postEntity.convertToObject()),
    );
  }
}
