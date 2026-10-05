import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsletterService {
  public async sendScheduledNotifications(): Promise<void> {}
}
