import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmailSubscriberController } from './email-subscriber.controller';
import {
  EmailSubscriberModel,
  EmailSubscriberSchema,
} from './email-subscriber.model';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [EmailSubscriberController],
  imports: [
    MailModule,
    MongooseModule.forFeature([
      {
        name: EmailSubscriberModel.name,
        schema: EmailSubscriberSchema,
      },
    ]),
  ],
  providers: [EmailSubscriberService, EmailSubscriberRepository],
  exports: [EmailSubscriberService],
})
export class EmailSubscriberModule {}
