import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';

type MailerAsyncOptions = Parameters<typeof MailerModule.forRootAsync>[0];

export const getMailerAsyncOptions = (
  configNamespace: string,
  templatesDirectory: string,
): MailerAsyncOptions => {
  return {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const user = configService.get<string>(`${configNamespace}.user`);
      const password = configService.get<string>(`${configNamespace}.password`);

      return {
        transport: {
          host: configService.getOrThrow<string>(`${configNamespace}.host`),
          port: configService.getOrThrow<number>(`${configNamespace}.port`),
          secure: false,
          ...(user && password && { auth: { user, pass: password } }),
        },
        defaults: {
          from: configService.getOrThrow<string>(`${configNamespace}.from`),
        },
        template: {
          dir: templatesDirectory,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      };
    },
  };
};
