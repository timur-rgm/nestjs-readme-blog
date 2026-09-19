import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { mongoConfig } from '@project/config-mongo';
import { rabbitConfig } from '@project/config-rabbit';

import applicationConfig from './application.config';
import jwtConfig from './jwt.config';

const ENV_FILE_PATH = 'apps/account/account.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, jwtConfig, mongoConfig, rabbitConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class ConfigAccountModule {}

