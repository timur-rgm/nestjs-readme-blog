import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { getRabbitMqConnectionString } from '@project/helpers';
import type { RabbitConfig } from '@project/config-rabbit';

import { NOTIFICATIONS_CLIENT } from './notifications-client.constant';
import { NotificationsClientService } from './notifications-client.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_CLIENT,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const rabbitConfig = configService.getOrThrow<RabbitConfig>('rabbit');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [getRabbitMqConnectionString(rabbitConfig)],
              queue: rabbitConfig.queue,
              queueOptions: { durable: true },
            },
          };
        },
      },
    ]),
  ],
  providers: [NotificationsClientService],
  exports: [NotificationsClientService],
})
export class NotificationsClientModule {}
