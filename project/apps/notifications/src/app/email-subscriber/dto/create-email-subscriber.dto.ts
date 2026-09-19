import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

import { EMAIL_NOT_VALID } from '../email-subscriber.constant';

export class CreateEmailSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public name!: string;
}
