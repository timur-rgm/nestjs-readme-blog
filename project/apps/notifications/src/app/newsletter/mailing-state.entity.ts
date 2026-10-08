import { Entity } from '@project/core';

export type MailingState = {
  id?: string;
  lastMailingAt: Date;
};

export class MailingStateEntity
  implements MailingState, Entity<string, MailingState>
{
  public id?: string;
  public lastMailingAt!: Date;

  constructor(mailingState: MailingState) {
    this.fillFromObject(mailingState);
  }

  public convertToObject(): MailingState {
    return {
      id: this.id,
      lastMailingAt: this.lastMailingAt,
    };
  }

  public fillFromObject(mailingState: MailingState): void {
    this.id = mailingState.id;
    this.lastMailingAt = mailingState.lastMailingAt;
  }

  static fromObject(mailingState: MailingState): MailingStateEntity {
    return new MailingStateEntity(mailingState);
  }
}
