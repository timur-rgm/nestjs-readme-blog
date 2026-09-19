import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { RabbitRoutingKey } from '@project/types';

import { NOTIFICATIONS_CLIENT } from './notifications-client.constant';
import { UserRegisteredEvent } from './events/user-registered.event';

@Injectable()
export class NotificationsClientService {
  constructor(
    @Inject(NOTIFICATIONS_CLIENT)
    private readonly notificationsClient: ClientProxy,
  ) {}

  public emitUserRegistered(event: UserRegisteredEvent): void {
    this.notificationsClient.emit(RabbitRoutingKey.UserRegistered, event);
  }
}
