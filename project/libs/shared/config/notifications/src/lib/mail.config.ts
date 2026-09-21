import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_SMTP_PORT = 25;

export interface MailConfig {
  host: string;
  port: number;
  user?: string;
  password?: string;
  from: string;
}

const validationSchema: Joi.ObjectSchema<MailConfig> = Joi.object({
  host: Joi.string().hostname().required(),
  port: Joi.number().port().default(DEFAULT_SMTP_PORT),
  user: Joi.string(),
  password: Joi.string(),
  from: Joi.string().email().required(),
});

const validateConfig = (config: unknown): MailConfig => {
  const { error, value } = validationSchema.validate(config, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(
      `[Notifications Mail Config Validation Error]: ${error.message}`,
    );
  }

  return value;
};

const getConfig = (): MailConfig =>
  validateConfig({
    host: process.env.MAIL_SMTP_HOST,
    port: process.env.MAIL_SMTP_PORT,
    user: process.env.MAIL_USER_NAME,
    password: process.env.MAIL_USER_PASSWORD,
    from: process.env.MAIL_FROM,
  });

export default registerAs('mail', getConfig);
