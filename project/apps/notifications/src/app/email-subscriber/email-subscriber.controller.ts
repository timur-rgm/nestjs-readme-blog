import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

import { RabbitRoutingKey } from '@project/types';

import { CreateEmailSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService,
  ) {}

  @EventPattern(RabbitRoutingKey.UserRegistered)
  public async addSubscriber(
    @Payload() dto: CreateEmailSubscriberDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    await this.emailSubscriberService.addSubscriber(dto);
    context.getChannelRef().ack(context.getMessage())
  }
}
