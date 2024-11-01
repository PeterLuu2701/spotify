import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async getAllSongCard() {
    try {
      const allSongCard = await this.prismaService.songs.findMany({
        include: {
          song_artists:{
            include: {
              artists: true
            }
          }
        }
      });
      
      return allSongCard.map(song => ({
        songName: song.song_name,
        image: song.image,
        artists: song.song_artists.map(songArtist => songArtist.artists.artist_name),
      }));
    } catch (error) {
      throw new Error('Failed to get all song card');
    }
  }
}
