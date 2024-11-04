import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { log } from 'console';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';

@Controller('api-gateway')
export class AppController {
  constructor(
    @Inject('AUTH_NAME') private authService: ClientProxy,
    @Inject('CATALOG_NAME') private catalogService: ClientProxy,
    @Inject('PLAYLIST_NAME') private playlistService: ClientProxy,
    @Inject('STREAMING_NAME') private streamingService: ClientProxy,
    @Inject('SEARCH_NAME') private searchService: ClientProxy,
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
    @Body() body: { playlist_name: string }
  ) {
    try {
      const { playlist_name } = body;

      const response = await lastValueFrom(
        this.playlistService.send('create-playlist', { token, playlist_name }).pipe(
          catchError((err) => {
            return of({
              error: err.message,
              message: 'Unable to create playlist',
            });
          })
        )
      );

      if (response?.error) {
        throw new UnauthorizedException(response.message || 'Playlist creation failed');
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
    @Body() body: { playlist_id: string }
  ) {
    try {
      const { playlist_id } = body;

      const response = await lastValueFrom(
        this.playlistService.send('delete-playlist', { token, playlist_id }).pipe(
          catchError((err) => {
            return of({
              error: err.message,
              message: 'Unable to delete playlist',
            });
          })
        )
      );

      if (response?.error) {
        throw new UnauthorizedException(response.message);
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to delete playlist');
    }
  }
}
