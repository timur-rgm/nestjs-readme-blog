import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import type { EmailSubscriber } from '@project/types';

import { EMAIL_SUBSCRIPTION_CONFIRMED_SUBJECT } from './mail.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendSubscriptionConfirmation(
    emailSubscriber: EmailSubscriber,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: emailSubscriber.email,
      subject: EMAIL_SUBSCRIPTION_CONFIRMED_SUBJECT,
      template: './add-email-subscriber',
      context: {
        user: emailSubscriber.name,
        email: emailSubscriber.email,
      },
    });
  }
}
