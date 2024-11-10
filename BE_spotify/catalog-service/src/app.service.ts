import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { error, log } from 'console';
import { AwsS3Service } from './aws-s3.service';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  async getAllSongCard() {
    try {
      const allSongCard =
        await this.prismaService.dbCatalogsClient.songs.findMany({
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
      const allArtists =
        await this.prismaService.dbCatalogsClient.artists.findMany();
      return allArtists;
    } catch (error) {
      throw new Error('Failed to get all artists');
    }
  }

  async getSongsByArtist(artistId: number) {
    try {
      const songsByArtist =
        await this.prismaService.dbCatalogsClient.songs.findMany({
          where: {
            song_artists: {
              some: {
                artist_id: Number(artistId),
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
      const allGenres =
        await this.prismaService.dbCatalogsClient.genres.findMany();
      console.log(allGenres);

      return allGenres;
    } catch (error) {
      throw new Error('Failed to get all genres');
    }
  }

  async getSongsByGenres(genreId: number) {
    try {
      const songsByGenre =
        await this.prismaService.dbCatalogsClient.songs.findMany({
          where: {
            genre_id: Number(genreId),
          },
        });
      console.log(songsByGenre);
      return songsByGenre;
    } catch (error) {
      console.error('Error fetching songs by artist:', error);
      throw new Error('Failed to get songs by artist');
    }
  }

  // getSongById
  async getSongDetailBySongId(songId: number) {
    try {
      const songDetailById =
        await this.prismaService.dbCatalogsClient.songs.findFirst({
          where: {
            id: Number(songId),
          },
        });
      console.log(songDetailById);
      return songDetailById;
    } catch (error) {
      console.error('Error fetching song detail:', error);
      throw new Error('Failed to get song detail');
    }
  }

  async createSong(
    song_name: string,
    description: string | undefined,
    album_id: number,
    duration: string,
    release_date: string,
    genre_id: number,
    image: string | undefined,
    file_url: string,
  ) {
    try {
      const newSong = await this.prismaService.dbCatalogsClient.songs.create({
        data: {
          song_name,
          description,
          album_id,
          duration,
          release_date,
          genre_id,
          image,
          file_url,
        },
      });
      console.log('newSong', newSong);
      
      return newSong;
    } catch (error) {
      console.error('Error creating song:', error);
      throw new Error('Failed to create song');
    }
  }
}
