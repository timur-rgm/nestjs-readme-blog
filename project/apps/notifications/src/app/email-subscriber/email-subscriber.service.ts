import { Injectable } from '@nestjs/common';

import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
  ) {}

  public async addSubscriber(
    dto: CreateEmailSubscriberDto,
  ): Promise<EmailSubscriberEntity> {
    const existingEmailSubscriberEntity =
      await this.emailSubscriberRepository.findByEmail(dto.email);

    if (existingEmailSubscriberEntity) {
      return existingEmailSubscriberEntity;
    }

    const emailSubscriberEntity = new EmailSubscriberEntity(dto);
    return this.emailSubscriberRepository.save(emailSubscriberEntity);
  }
}
