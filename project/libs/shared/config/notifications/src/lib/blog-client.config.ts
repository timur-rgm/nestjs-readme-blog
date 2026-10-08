import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface BlogClientConfig {
  queue: string;
}

const validationSchema: Joi.ObjectSchema<BlogClientConfig> = Joi.object({
  queue: Joi.string().required(),
});

const validateConfig = (config: unknown): BlogClientConfig => {
  const { error, value } = validationSchema.validate(config, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(`[Blog Client Config Validation Error]: ${error.message}`);
  }

  return value;
};

const getConfig = (): BlogClientConfig =>
  validateConfig({
    queue: process.env.RABBIT_BLOG_QUEUE,
  });

export default registerAs('blogClient', getConfig);
