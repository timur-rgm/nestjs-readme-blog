import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import type { MailingState } from './mailing-state.entity';

@Schema({
  collection: 'mailing-state',
  timestamps: true,
})
export class MailingStateModel extends Document implements MailingState {
  @Prop({
    required: true,
  })
  public lastMailingAt!: Date;
}

export const MailingStateSchema =
  SchemaFactory.createForClass(MailingStateModel);
