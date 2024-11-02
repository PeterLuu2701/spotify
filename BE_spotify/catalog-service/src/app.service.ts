import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { error, log } from 'console';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async getAllSongCard() {
    try {
      const allSongCard = await this.prismaService.songs.findMany({
        include: {
          song_artists: {
            include: {
              artists: true,
            },
          },
        },
      });

      return allSongCard.map((song) => ({
        songName: song.song_name,
        image: song.image,
        artists: song.song_artists.map(
          (songArtist) => songArtist.artists.artist_name,
        ),
      }));
    } catch (error) {
      throw new Error('Failed to get all song card');
    }
  }

  async getAllArtists() {
    try {
      const allArtists = await this.prismaService.artists.findMany();
      return allArtists;
    } catch (error) {
      throw new Error('Failed to get all artists');
    }
  }

  async getSongsByArtist(artistId: number) {
    try {
      const songsByArtist = await this.prismaService.songs.findMany({
        where: {
          song_artists: {
            some: {
              artist_id: artistId,
            },
          },
        },
        include: {
          song_artists: {
            include: {
              artists: true,
            },
          },
        },
      });

      return songsByArtist.map((song) => ({
        songName: song.song_name,
        image: song.image,
        artists: song.song_artists.map(
          (songArtist) => songArtist.artists.artist_name,
        ),
      }));
    } catch (error) {
      console.error('Error fetching songs by artist:', error);
      throw new Error('Failed to get songs by artist');
    }
  }

  async getAllGenres() {
    try {
      const allGenres = await this.prismaService.genres.findMany();
      console.log(allGenres);
      
      return allGenres;
    } catch (error) {
      throw new Error('Failed to get all genres');
    }
  }

  async getSongsByGenres(genreId: number) {
    try {
      const songsByGenre = await this.prismaService.songs.findMany({
        where: {
          genre_id: genreId,
        },
      });
      console.log(songsByGenre)
      return songsByGenre;
    } catch (error) {
      console.error('Error fetching songs by artist:', error);
      throw new Error('Failed to get songs by artist');
    }
  }
}
