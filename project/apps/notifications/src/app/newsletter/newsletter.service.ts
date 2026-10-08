import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { Post, RabbitRoutingKey } from '@project/types';

import { BLOG_CLIENT } from './newsletter.constant';

@Injectable()
export class NewsletterService {
  constructor(
    @Inject(BLOG_CLIENT) private readonly rabbitClient: ClientProxy,
  ) {}

  public async sendScheduledNotifications(): Promise<void> {}

  public async getPostsCreatedAfter(date: Date): Promise<Post[]> {
    return lastValueFrom(
      this.rabbitClient.send(RabbitRoutingKey.GetPostsCreatedAfter, date),
    );
  }
}
