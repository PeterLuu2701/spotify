import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true
    }),

    ClientsModule.register([
      {
        name: 'AUTH_NAME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@some-rabbit:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),

    ClientsModule.register([
      {
        name: 'CATALOG_NAME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@some-rabbit:5672'],
          queue: 'catalog_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),

    ClientsModule.register([
      {
        name: 'PLAYLIST_NAME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@some-rabbit:5672'],
          queue: 'playlist_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),

    ClientsModule.register([
      {
        name: 'STREAMING_NAME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@some-rabbit:5672'],
          queue: 'streaming_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),

    ClientsModule.register([
      {
        name: 'SEARCH_NAME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@some-rabbit:5672'],
          queue: 'search_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),

  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
