import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_RABBIT_PORT = 5672;

export interface RabbitConfig {
  host: string;
  password: string;
  user: string;
  queue: string;
  exchange: string;
  port: number;
}

const validationSchema: Joi.ObjectSchema<RabbitConfig> = Joi.object({
  host: Joi.string().valid().hostname().required(),
  password: Joi.string().required(),
  port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
  user: Joi.string().required(),
  queue: Joi.string().required(),
  exchange: Joi.string().required(),
});

const validateConfig = (config: unknown): RabbitConfig => {
  const { error, value } = validationSchema.validate(config, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(
      `[Notifications Rabbit Config Validation Error]: ${error.message}`,
    );
  }

  return value;
};

const getConfig = (): RabbitConfig =>
  validateConfig({
    host: process.env.RABBIT_HOST,
    password: process.env.RABBIT_PASSWORD,
    port: process.env.RABBIT_PORT,
    user: process.env.RABBIT_USER,
    queue: process.env.RABBIT_QUEUE,
    exchange: process.env.RABBIT_EXCHANGE,
  });

export default registerAs('rabbit', getConfig);
