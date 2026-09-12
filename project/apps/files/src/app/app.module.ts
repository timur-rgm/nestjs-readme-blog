import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigFilesModule } from '@project/config-files';
import { getMongooseOptions } from '@project/config-mongo';

import { FileUploaderModule } from './file-uploader/file-uploader.module';

@Module({
  imports: [
    ConfigFilesModule,
    FileUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
