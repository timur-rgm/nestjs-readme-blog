import { Controller, Post } from '@nestjs/common';

import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('send')
  public async sendScheduledNotifications(): Promise<void> {
    await this.newsletterService.sendScheduledNotifications();
  }
}
