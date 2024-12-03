import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async createStreamingSession(params): Promise<number> {
    try {
      const { userId, songId } = params;
      const session =
        await this.prismaService.streaming.create({
          data: {
            user_id: Number(userId),
            song_id: Number(songId),
            status: 'playing',
          },
        });

      return session.id;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to start streaming session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async pauseStreamingSession(params): Promise<boolean> {
    try {
      const { sessionId } = params;
      const session =
        await this.prismaService.streaming.findUnique({
          where: {
            id: Number(sessionId),
          },
        });

      if (!session) {
        return false;
      }

      await this.prismaService.streaming.update({
        where: {
          id: Number(sessionId),
        },
        data: {
          status: 'paused',
        },
      });

      return true;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to pause streaming session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resumeStreamingSession(params): Promise<boolean> {
    try {
      const { sessionId } = params;
      const session =
        await this.prismaService.streaming.findUnique({
          where: {
            id: Number(sessionId),
          },
        });

      if (!session) {
        return false;
      }

      await this.prismaService.streaming.update({
        where: {
          id: Number(sessionId),
        },
        data: {
          status: 'playing',
        },
      });

      return true;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to resume streaming session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStreamingSessionsByUser(user): Promise<any[]> {
    try {
      const { userId } = user;
      const sessions =
        await this.prismaService.streaming.findMany({
          where: {
            user_id: Number(userId),
          },
        });

      return sessions;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get streaming sessions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStreamingSessionById(params): Promise<any> {
    try {
      const { sessionId } = params;
      const session =
        await this.prismaService.streaming.findUnique({
          where: {
            id: Number(sessionId),
          },
        });

      return session;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get streaming session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
