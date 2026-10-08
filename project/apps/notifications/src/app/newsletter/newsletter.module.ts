import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import type { BlogClientConfig } from '@project/config-notifications';
import { getRabbitMqConnectionString } from '@project/helpers';
import type { RabbitConfig } from '@project/config-rabbit';

import { BLOG_CLIENT } from './newsletter.constant';
import { MailingStateModel, MailingStateSchema } from './mailing-state.model';
import { NewsletterController } from './newsletter.controller';
import { NewsletterRepository } from './newsletter.repository';
import { NewsletterService } from './newsletter.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: BLOG_CLIENT,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const rabbitConfig = configService.getOrThrow<RabbitConfig>('rabbit');
          const blogClientConfig =
            configService.getOrThrow<BlogClientConfig>('blogClient');

          return {
            transport: Transport.RMQ,
            options: {
              urls: [getRabbitMqConnectionString(rabbitConfig)],
              queue: blogClientConfig.queue,
              queueOptions: { durable: true },
            },
          };
        },
      },
    ]),
    MongooseModule.forFeature([
      {
        name: MailingStateModel.name,
        schema: MailingStateSchema,
      },
    ]),
  ],
  controllers: [NewsletterController],
  providers: [NewsletterRepository, NewsletterService],
})
export class NewsletterModule {}
