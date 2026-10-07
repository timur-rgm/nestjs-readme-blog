import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { rabbitConfig } from '@project/config-rabbit';

const ENV_FILE_PATH = 'apps/blog/blog.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [rabbitConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigBlogModule {}
