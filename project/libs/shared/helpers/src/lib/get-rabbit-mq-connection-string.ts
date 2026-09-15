type GetRabbitMQConnectionStringParams = {
  user: string;
  password: string;
  host: string;
  port: number;
};

export function getRabbitMqConnectionString({
  user,
  password,
  host,
  port,
}: GetRabbitMQConnectionStringParams): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}
