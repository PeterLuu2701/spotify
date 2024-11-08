import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  dbCatalogsClient: PrismaClient;
  dbStreamingClient: PrismaClient;

  constructor() {
    this.dbCatalogsClient = new PrismaClient({
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
    await this.dbCatalogsClient.$connect();
    await this.dbStreamingClient.$connect();
  }

  async onModuleDestroy() {
    await this.dbCatalogsClient.$disconnect();
    await this.dbStreamingClient.$disconnect();
  }
}