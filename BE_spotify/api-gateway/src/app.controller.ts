import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { log } from 'console';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from './aws-s3.service'; 


@Controller('api-gateway')
export class AppController {
  constructor(
    @Inject('AUTH_NAME') private authService: ClientProxy,
    @Inject('CATALOG_NAME') private catalogService: ClientProxy,
    @Inject('PLAYLIST_NAME') private playlistService: ClientProxy,
    @Inject('STREAMING_NAME') private streamingService: ClientProxy,
    @Inject('SEARCH_NAME') private searchService: ClientProxy,
    private readonly awsS3Service: AwsS3Service
  ) {}

  // AUTH_SERVICE
  @Post('/login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const response = await lastValueFrom(
      this.authService.send('login-user', loginDto).pipe(
        catchError((err) => {
          return of({
            err,
            message: 'Unable to login user',
          });
        }),
      ),
    );

    if (response?.err) {
      console.log('env', process.env.RABBITMQ_URL);

      console.log('Error from auth service:', response.err);
      throw new UnauthorizedException('Invalid credentials');
    }

    return response;
  }

  @Post('/sign-up')
  async signUp(
    @Body()
    signUpDto: {
      name: string;
      email: string;
      password: string;
      avatar: string;
      description: string;
      banner: string;
      nationality: string;
    },
  ) {
    const response = await lastValueFrom(
      this.authService.send('sign-up', signUpDto).pipe(
        catchError((err) => {
          return of({
            err,
            message: 'Unable to login user',
          });
        }),
      ),
    );

    if (response?.err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return response;
  }

  // CATALOG_SERVICE
  @Post('/create-song')
@UseInterceptors(FileInterceptor('file_url'))
@UseGuards()
async createSong(
  @Headers('token') token: string,
  @Body()
  body: {
    song_name: string;
    description?: string;
    album_id: number;
    duration: string;
    release_date: string;
    genre_id: number;
    image?: string;
  },
  @UploadedFile() file_url: Express.Multer.File
) {
  console.log('Uploaded file:', file_url);
  
  try {
    const { song_name, description, album_id, duration, release_date, genre_id, image } = body;

    // Upload file to S3 and get the file URL
    const fileUrl = await this.awsS3Service.uploadFile(file_url);

    // Send the request to catalogService with the S3 URL
    const response = await lastValueFrom(
      this.catalogService
        .send('create-song', {
          token,
          song_name,
          description,
          album_id,
          duration,
          release_date,
          genre_id,
          image,
          file_url: fileUrl, // Use the URL instead of the file object
        })
        .pipe(
          catchError((err) => {
            return of({
              error: err.message,
              message: 'Unable to create song',
            });
          }),
        ),
    );

    if (response?.error) {
      throw new UnauthorizedException(
        response.message || 'Song creation failed',
      );
    }

    return response;
  } catch (error) {
    console.error('Error creating song:', error);
    throw new UnauthorizedException('Failed to create song');
  }
}

  @Get('/get-all-song-card')
  async getAllSongCard() {
    const response = await lastValueFrom(
      this.catalogService.send('get-all-song-card', '').pipe(
        catchError((err) => {
          return of({
            err,
            message: 'Unable to get song cards',
          });
        }),
      ),
    );

    if (response?.err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return response;
  }

  @Get('/get-all-artists')
  async getAllArtists() {
    const response = await lastValueFrom(
      this.catalogService.send('get-all-artists', '').pipe(
        catchError((err) => {
          return of({
            err,
            message: 'Unable to get artists',
          });
        }),
      ),
    );

    if (response?.err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return response;
  }

  @Get('/get-songs-by-artist/:artistId')
  async getSongsByArtist(@Param('artistId') artistId: number) {
    const data = { artistId };

    const response = await lastValueFrom(
      this.catalogService.send('get-songs-by-artist', data).pipe(
        catchError((err) => {
          console.error('Error from catalog service:', err);
          return of({
            err,
            message: 'Unable to get songs',
          });
        }),
      ),
    );

    if (response?.err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return response;
  }

  @Get('/get-all-genres')
  async getAllGenres() {
    const response = await lastValueFrom(
      this.catalogService.send('get-all-genres', '').pipe(
        catchError((err) => {
          return of({
            err,
            message: 'Unable to get genres',
          });
        }),
      ),
    );

    if (response?.err) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('Search result', response);

    return response;
  }

  @Get('/get-songs-by-genre/:genreId')
  async getSongsByGenres(@Param('genreId') genreId: number) {
    const data = { genreId };

    const response = await lastValueFrom(
      this.catalogService.send('get-songs-by-genre', data).pipe(
        catchError((err) => {
          console.error('Error from catalog service:', err);
          return of({
            err,
            message: 'Unable to get songs',
          });
        }),
      ),
    );

    if (response?.err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return response;
  }

  @Get('/get-song-detail-by-song-id/:songId')
  async getSongDetailBySongId(@Param('songId') songId: number) {
    const data = { songId };

    const response = await lastValueFrom(
      this.catalogService.send('get-song-detail-by-song-id', data).pipe(
        catchError((err) => {
          console.error('Error from catalog service:', err);
          return of({
            err,
            message: 'Unable to get song detail',
          });
        }),
      ),
    );

    if (response?.err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return response;
  }

  // PLAYLIST_SERVICE
  @Post('/create-playlist')
  @UseGuards()
  async createPlaylist(
    @Headers('token') token: string,
    @Body()
    body: {
      playlist_name: string;
      description: string;
      is_public: boolean;
      image: string;
    },
  ) {
    try {
      const { playlist_name, description, is_public, image } = body;

      const response = await lastValueFrom(
        this.playlistService
          .send('create-playlist', {
            token,
            playlist_name,
            description,
            is_public,
            image,
          })
          .pipe(
            catchError((err) => {
              return of({
                error: err.message,
                message: 'Unable to create playlist',
              });
            }),
          ),
      );

      if (response?.error) {
        throw new UnauthorizedException(
          response.message || 'Playlist creation failed',
        );
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to create playlist');
    }
  }

  @Delete('/delete-playlist')
  @UseGuards()
  async deletePlaylist(
    @Headers('token') token: string,
    @Body() body: { playlist_id: string },
  ) {
    try {
      const { playlist_id } = body;

      const response = await lastValueFrom(
        this.playlistService
          .send('delete-playlist', { token, playlist_id })
          .pipe(
            catchError((err) => {
              return of({
                error: err.message,
                message: 'Unable to delete playlist',
              });
            }),
          ),
      );

      if (response?.error) {
        throw new UnauthorizedException(response.message);
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to delete playlist');
    }
  }

  @Patch('/edit-playlist')
  @UseGuards()
  async editPlaylist(
    @Headers('token') token: string,
    @Body()
    body: {
      playlist_id: number;
      playlist_name: string;
      description: string;
      is_public: boolean;
      image: string;
    },
  ) {
    try {
      const { playlist_id, playlist_name, description, is_public, image } =
        body;

      const response = await lastValueFrom(
        this.playlistService
          .send('edit-playlist', {
            token,
            playlist_id,
            playlist_name,
            description,
            is_public,
            image,
          })
          .pipe(
            catchError((err) => {
              return of({
                error: err.message,
                message: 'Unable to edit playlist',
              });
            }),
          ),
      );

      if (response?.error) {
        throw new UnauthorizedException(
          response.message || 'Playlist creation failed',
        );
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to edit playlist');
    }
  }

  @Get('/get-playlist-by-playlist-id/:playlistId')
  async getPlaylistByPlaylistId(@Param('playlistId') playlistId: number) {
    const data = { playlistId };

    const response = await lastValueFrom(
      this.playlistService.send('get-playlist-by-playlist-id', data).pipe(
        catchError((err) => {
          console.error('Error from playlist service:', err);
          return of({
            err,
            message: 'Unable to get playlist',
          });
        }),
      ),
    );

    if (response?.err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return response;
  }

  @Get('/get-playlist-by-user-id/:userId')
  async getPlaylistByUserId(@Param('userId') userId: number) {
    const data = { userId };

    const response = await lastValueFrom(
      this.playlistService.send('get-playlist-by-user-id', data).pipe(
        catchError((err) => {
          console.error('Error from playlist service:', err);
          return of({
            err,
            message: 'Unable to get playlist',
          });
        }),
      ),
    );

    if (response?.err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return response;
  }

}
