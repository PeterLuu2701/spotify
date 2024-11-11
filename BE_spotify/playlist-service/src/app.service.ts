import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  // createPlayList
  async createPlaylist(
    user: any,
    playlist_name: string,
    description: string,
    is_public: boolean,
    image: string,
  ) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const playlist = await this.prismaService.playlists.create({
        data: {
          user_id: Number(userId),
          playlist_name,
          description,
          is_public: true,
          image,
          create_date: new Date(),
        },
      });

      return playlist;
    } catch (error) {
      throw error;
    }
  }

  // deletePlaylist
  async deletePlaylist(user: any, playlist_id: number) {
    try {
      console.log('User:', user); // Now the user is passed directly

      const userId = user.userId; // Use the user ID from the decoded token
      console.log('User ID:', userId);

      const checkUser = await this.prismaService.playlists.findFirst({
        where: {
          user_id: Number(userId),
          id: playlist_id,
        },
      });
      console.log('Playlist ID:', playlist_id);
      if (checkUser) {
        const playlistToDelete = await this.prismaService.playlists.delete({
          where: {
            id: Number(playlist_id),
          },
        });

        return playlistToDelete;
      } else {
        return 'You can only delete your playlists';
      }
    } catch (error) {
      throw error;
    }
  }

  // editPlayList
  async editPlaylist(
    user: any,
    playlist_id: number,
    playlist_name: string,
    description: string,
    is_public: boolean,
    image: string,
  ) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const checkUser = await this.prismaService.playlists.findFirst({
        where: {
          user_id: Number(userId),
          id: playlist_id,
        },
      });
      console.log('Playlist ID:', playlist_id);
      if (checkUser) {
        const playlistToEdit = await this.prismaService.playlists.update({
          data: {
            playlist_name,
            description,
            is_public,
            image,
          },
          where: {
            id: Number(playlist_id),
          },
        });

        return playlistToEdit;
      } else {
        return 'You can only edit your playlists';
      }
    } catch (error) {
      throw error;
    }
  }

  // addSongToPlaylist
  async addSongToPlaylist(user: any, playlist_id: number, song_id: number) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const songToBeAdded = await this.prismaService.playlist_songs.create({
        data: {
          user_id: Number(userId),
          playlist_id,
          song_id,
        },
      });
      return songToBeAdded;
    } catch (error) {
      throw error;
    }
  }

  // getPlayListById
  async getPlaylistByPlaylistId(playlistId: number) {
    try {
      console.log('Input Playlist ID:', playlistId);
      const privatePlaylist = await this.prismaService.playlists.findFirst({
        where: {
          id: Number(playlistId),
          is_public: false,
        },
      });

      if (privatePlaylist) {
        console.log('Private Playlist ID:', privatePlaylist);
        return 'This is a private playlist';
      }

      const playlist = await this.prismaService.playlists.findFirst({
        where: {
          id: Number(playlistId),
          is_public: true,
        },
      });

      if (!playlist) {
        throw new Error('Playlist not found');
      }
      return playlist;
    } catch (error) {
      throw error;
    }
  }

  // getPlayListByUser
  async getPlaylistByUserId(userId: number) {
    try {
      console.log('Input Playlist ID:', userId);
      const playlist = await this.prismaService.playlists.findMany({
        where: {
          user_id: Number(userId),
          is_public: true,
        },
      });

      if (!playlist) {
        throw new Error('Playlist not found');
      }
      return playlist;
    } catch (error) {
      throw error;
    }
  }
}
