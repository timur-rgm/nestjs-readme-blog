import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/core';

import { MailingStateEntity } from './mailing-state.entity';
import { MailingStateModel } from './mailing-state.model';

@Injectable()
export class NewsletterRepository extends BaseMongoRepository<
  MailingStateEntity,
  MailingStateModel
> {
  constructor(
    @InjectModel(MailingStateModel.name)
    mailingStateModel: Model<MailingStateModel>,
  ) {
    super(mailingStateModel, MailingStateEntity.fromObject);
  }

  public async findLastMailingAt(): Promise<Date | null> {
    const mailingStateDocument = await this.model.findOne().exec();
    return mailingStateDocument?.lastMailingAt ?? null;
  }

  public async updateLastMailingAt(date: Date): Promise<void> {
    await this.model
      .findOneAndUpdate({}, { $set: { lastMailingAt: date } }, { upsert: true })
      .exec();
  }
}
