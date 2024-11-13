import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async createComment(
    user: any,
    content: string,
    song_id: number,
  ) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const comment = await this.prismaService.comments.create({
        data: {
          user_id: Number(userId),
          content,
          song_id,
          comment_date: new Date(),
        },
      });

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async getAllComments() {
    try {
      const allComments = await this.prismaService.comments.findMany();
      return allComments;
    } catch (error) {
      throw new Error('Failed to get all artists');
    }
  }
}
