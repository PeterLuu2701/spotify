import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  dbUsersClient: PrismaClient;
  dbStreamingClient: PrismaClient;

  constructor() {
    this.dbUsersClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL, 
        },
      },
    });

    this.dbStreamingClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_STREAMING_URL, 
        },
      },
    });
  }

  async onModuleInit() {
    await this.dbUsersClient.$connect();
    await this.dbStreamingClient.$connect();
  }

  async onModuleDestroy() {
    await this.dbUsersClient.$disconnect();
    await this.dbStreamingClient.$disconnect();
  }
}