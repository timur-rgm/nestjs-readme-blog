import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { mongoConfig } from '@project/config-mongo';
import { rabbitConfig } from '@project/config-rabbit';

import applicationConfig from './application.config';
import blogClientConfig from './blog-client.config';
import mailConfig from './mail.config';

const ENV_FILE_PATH = 'apps/notifications/notifications.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        applicationConfig,
        blogClientConfig,
        mailConfig,
        mongoConfig,
        rabbitConfig,
      ],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigNotificationsModule {}
