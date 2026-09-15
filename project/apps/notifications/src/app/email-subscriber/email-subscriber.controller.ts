import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CreateEmailSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { RabbitRoutingKey } from '@project/types';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService,
  ) {}

  @EventPattern(RabbitRoutingKey.UserRegistered)
  public async addSubscriber(
    @Payload() dto: CreateEmailSubscriberDto,
  ): Promise<void> {
    await this.emailSubscriberService.addSubscriber(dto);
  }
}
