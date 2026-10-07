/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { type RmqOptions, Transport } from '@nestjs/microservices';

import type { RabbitConfig } from '@project/config-rabbit';
import { getRabbitMqConnectionString } from '@project/helpers';

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

  const config = new DocumentBuilder()
    .setTitle('The «Blog» service')
    .setDescription('Blog service API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
