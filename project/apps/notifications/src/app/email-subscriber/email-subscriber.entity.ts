import type { EmailSubscriber } from '@project/types';
import type { Entity } from '@project/core';

export class EmailSubscriberEntity
  implements EmailSubscriber, Entity<string, EmailSubscriber>
{
  public id?: string;
  public email!: string;
  public name!: string;

  constructor(subscriber: EmailSubscriber) {
    this.fillFromObject(subscriber);
  }

  public convertToObject(): EmailSubscriber {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    };
  }

  public fillFromObject(subscriber: EmailSubscriber): void {
    this.id = subscriber.id;
    this.email = subscriber.email;
    this.name = subscriber.name;
  }

  static fromObject(subscriber: EmailSubscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity(subscriber);
  }
}
