import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  dbStreamingClient: PrismaClient;

  constructor() {
    this.dbStreamingClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL, 
        },
      },
    });
  }

  async onModuleInit() {
    await this.dbStreamingClient.$connect();
  }

  async onModuleDestroy() {
    await this.dbStreamingClient.$disconnect();
  }
}
