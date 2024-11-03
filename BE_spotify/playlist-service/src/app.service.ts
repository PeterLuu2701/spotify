import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  // createPlayList
  async createPlaylist(token: string, playlist_name: string) {
    try {
      console.log('Token:', token);
      
      const decodedToken = this.authService.validateToken(token);
      console.log('Decoded Token:', decodedToken);
      const userId = decodedToken.userId;
      console.log('User ID:', userId);

      const playlist = await this.prismaService.playlists.create({
        data: {
          user_id: Number(userId),
          playlist_name,
        },
      });

      return playlist;
    } catch (error) {
      throw error;
    }
  }
  // deletePlaylist
  // editPlayList
  // getPlayListById
  // getPlayListByUser
  getHello(): string {
    return 'Hello World!';
  }
}
