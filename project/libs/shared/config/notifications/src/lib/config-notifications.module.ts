import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { mongoConfig } from '@project/config-mongo';

import applicationConfig from './application.config';
import rabbitConfig from './rabbit.config';

const ENV_FILE_PATH = 'apps/notifications/notifications.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig, rabbitConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigNotificationsModule {}
