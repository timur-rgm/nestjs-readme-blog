import { Module } from '@nestjs/common';

import { ConfigNotificationsModule } from '@project/config-notifications';

@Module({
  imports: [ConfigNotificationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
