import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigNotificationsModule } from '@project/config-notifications';
import { getMongooseOptions } from '@project/config-mongo';

import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [
    ConfigNotificationsModule,
    EmailSubscriberModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    NewsletterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
