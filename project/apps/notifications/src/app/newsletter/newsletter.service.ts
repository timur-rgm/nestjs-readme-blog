import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { PostType, RabbitRoutingKey } from '@project/types';
import type { Post } from '@project/types';

import { BLOG_CLIENT } from './newsletter.constant';
import { EmailSubscriberService } from '../email-subscriber/email-subscriber.service';
import { MailService } from '../mail/mail.service';
import type { NewsletterPostSummary } from '../mail/newsletter-post-summary.interface';
import { NewsletterRepository } from './newsletter.repository';

@Injectable()
export class NewsletterService {
  constructor(
    @Inject(BLOG_CLIENT) private readonly rabbitClient: ClientProxy,
    private readonly newsletterRepository: NewsletterRepository,
    private readonly emailSubscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  public async sendScheduledNotifications(): Promise<void> {
    const lastMailingAt = await this.newsletterRepository.findLastMailingAt();
    const date = lastMailingAt ?? new Date(0);
    const posts = await this.getPostsCreatedAfter(date);

    if (posts.length === 0) return;

    const postSummaries = this.getPostSummaries(posts);
    const subscribers = await this.emailSubscriberService.getAllSubscribers();

    for (const subscriber of subscribers) {
      await this.mailService.sendNewPostsNotification(
        subscriber,
        postSummaries,
      );
    }
  }

  private async getPostsCreatedAfter(date: Date): Promise<Post[]> {
    return lastValueFrom(
      this.rabbitClient.send(RabbitRoutingKey.GetPostsCreatedAfter, date),
    );
  }

  private getPostSummaries(posts: Post[]): NewsletterPostSummary[] {
    return posts.map((post) => {
      let summary: string;

      switch (post.type) {
        case PostType.Text:
        case PostType.Video:
          summary = post.title;
          break;
        case PostType.Link:
          summary = post.description ?? post.linkUrl;
          break;
        case PostType.Quote:
          summary = post.quote;
          break;
        case PostType.Photo:
          summary = 'Фотография';
          break;
        default: {
          throw new Error(`Unsupported post: ${post}`);
        }
      }

      const createdAt =
        post.createdAt?.toLocaleDateString('ru-RU') ?? 'Дата неизвестна';

      return { summary, createdAt };
    });
  }
}
