import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { resolve } from 'node:path';

import { getMailerAsyncOptions } from '@project/config-notifications';

import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync(
      getMailerAsyncOptions('mail', resolve(__dirname, 'assets')),
    ),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
