import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { Post, RabbitRoutingKey } from '@project/types';

import { BLOG_CLIENT } from './newsletter.constant';
import { EmailSubscriberService } from '../email-subscriber/email-subscriber.service';
import { NewsletterRepository } from './newsletter.repository';

@Injectable()
export class NewsletterService {
  constructor(
    @Inject(BLOG_CLIENT) private readonly rabbitClient: ClientProxy,
    private readonly newsletterRepository: NewsletterRepository,
    private readonly emailSubscriberService: EmailSubscriberService
  ) {}

  public async sendScheduledNotifications(): Promise<void> {
    const lastMailingAt = await this.newsletterRepository.findLastMailingAt();
    const date = lastMailingAt ?? new Date(0);
    const posts = await this.getPostsCreatedAfter(date);
    const subscribers = await this.emailSubscriberService.getAllSubscribers();
  }

  private async getPostsCreatedAfter(date: Date): Promise<Post[]> {
    return lastValueFrom(
      this.rabbitClient.send(RabbitRoutingKey.GetPostsCreatedAfter, date),
    );
  }
}
