/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { type RmqOptions, Transport } from '@nestjs/microservices';

import { getRabbitMqConnectionString } from '@project/helpers';
import type { RabbitConfig } from '@project/config-rabbit';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const rabbitConfig = configService.getOrThrow<RabbitConfig>('rabbit');
  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [getRabbitMqConnectionString(rabbitConfig)],
      queue: rabbitConfig.queue,
      queueOptions: {
        durable: true,
      },
      noAck: false,
    },
  });
  await app.startAllMicroservices();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
