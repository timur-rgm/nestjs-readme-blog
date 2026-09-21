import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

import { RabbitRoutingKey } from '@project/types';

import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @EventPattern(RabbitRoutingKey.UserRegistered)
  public async addSubscriber(
    @Payload() dto: CreateEmailSubscriberDto,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const emailSubscriberEntity =
      await this.emailSubscriberService.addSubscriber(dto);
    await this.mailService.sendSubscriptionConfirmation(emailSubscriberEntity);
    context.getChannelRef().ack(context.getMessage());
  }
}
