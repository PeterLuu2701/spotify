import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, of } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from './aws-s3.service';
import { Request, Response } from 'express';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Controller('api-gateway')
export class AppController {
  private readonly s3Client: S3Client;

  constructor(
    @Inject('AUTH_NAME') private authService: ClientProxy,
    @Inject('CATALOG_NAME') private catalogService: ClientProxy,
    @Inject('PLAYLIST_NAME') private playlistService: ClientProxy,
    @Inject('STREAMING_NAME') private streamingService: ClientProxy,
    @Inject('SEARCH_NAME') private searchService: ClientProxy,
    @Inject('SOCIAL_NAME') private socialService: ClientProxy,
    private readonly awsS3Service: AwsS3Service,
  ) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

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
  async createSong(
    @Req() req: Request,
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
    @UploadedFile() file_url: Express.Multer.File,
  ) {
    try {
      const {
        song_name,
        description,
        album_id,
        duration,
        release_date,
        genre_id,
        image,
      } = body;

      const fileUrl = await this.awsS3Service.uploadFile(file_url);

      const songParams = {
        song_name,
        description,
        album_id: Number(album_id),
        duration,
        release_date,
        genre_id: Number(genre_id),
        image,
        file_url: fileUrl,
      };

      const response = await lastValueFrom(
        this.catalogService.send('create-song', songParams).pipe(
          catchError((err) => {
            console.error('Error in catalogService.create-song:', err);
            return of({
              error: true,
              message:
                'Internal server error while creating song in catalog service',
              details: err.message,
            });
          }),
        ),
      );

      if (response?.error) {
        throw new UnauthorizedException(
          response.message || 'Song creation failed in catalog service',
        );
      }

      await lastValueFrom(
        this.searchService
          .send('index-song', {
            index: 'songs',
            id: response.song_id,
            document: songParams,
          })
          .pipe(
            catchError((err) => {
              console.error('Error in searchService.index-song:', err);
              return of({
                error: true,
                message:
                  'Internal server error while creating song in search service',
                details: err.message,
              });
            }),
          ),
      );
      return response;
    } catch (error) {
      console.error('Error creating song in app.controller:', error);
      throw new UnauthorizedException(
        'Failed to create song in app.controller',
      );
    }
  }

  @Delete('/delete-song/:id')
  @UseGuards(AuthGuard)
  async deleteSong(@Param('id') id: number, @Req() req: Request) {
    try {
      console.log('req--------', req['user']);
      console.log('songid------', id);

      const songUrl = await lastValueFrom(
        this.catalogService.send('get-song-detail-by-song-id', { songId: id }),
      );

      console.log('Song URL: ', songUrl.file_url);

      await this.awsS3Service.deleteFile(songUrl.file_url);

      const response = await lastValueFrom(
        this.catalogService.send('delete-song', { song_id: Number(id) }).pipe(
          catchError((err) => {
            console.error('Error in catalogService.delete-song:', err);
            return of({
              error: true,
              message:
                'Internal server error while deleting song in catalog service',
              details: err.message,
            });
          }),
        ),
      );

      if (response?.error) {
        throw new UnauthorizedException(
          response.message || 'Song deletion failed in catalog service',
        );
      }

      return { message: 'Song deleted successfully' };
    } catch (error) {
      console.error('Error deleting song in app.controller:', error);
      throw new UnauthorizedException(
        'Failed to delete song in app.controller',
      );
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
            details: err.stack || err.message,
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
  @UseGuards(AuthGuard)
  async createPlaylist(
    @Req() req: Request,
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
            user: req['user'],
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
  @UseGuards(AuthGuard)
  async deletePlaylist(
    @Req() req: Request,
    @Body() body: { playlist_id: string },
  ) {
    try {
      const { playlist_id } = body;

      const response = await lastValueFrom(
        this.playlistService
          .send('delete-playlist', { user: req['user'], playlist_id })
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
  @UseGuards(AuthGuard)
  async editPlaylist(
    @Req() req: Request,
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
            user: req['user'],
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
          response.message || 'Playlist edit failed',
        );
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to edit playlist');
    }
  }

  // addSongToPlaylist
  @Post('/add-song-to-playlist')
  @UseGuards(AuthGuard)
  async addSongToPlaylist(
    @Req() req: Request,
    @Body()
    body: {
      playlist_id: number;
      song_id: number;
    },
  ) {
    try {
      const { playlist_id, song_id } = body;

      const response = await lastValueFrom(
        this.playlistService
          .send('add-song-to-playlist', {
            user: req['user'],
            playlist_id,
            song_id,
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
          response.message || 'Playlist edit failed',
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

  // SOCIAL-SERVICE
  @Get('/get-all-comments')
  async getAllComments() {
    const response = await lastValueFrom(
      this.socialService.send('get-all-comments', '').pipe(
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

  @Post('/create-comment')
  @UseGuards(AuthGuard)
  async createComment(
    @Req() req: Request,
    @Body()
    body: {
      content: string;
      song_id: number;
    },
  ) {
    try {
      const { content, song_id } = body;

      const response = await lastValueFrom(
        this.socialService
          .send('create-comment', {
            user: req['user'],
            content,
            song_id,
          })
          .pipe(
            catchError((err) => {
              return of({
                error: err.message,
                message: 'Unable to make a comment',
              });
            }),
          ),
      );

      if (response?.error) {
        throw new UnauthorizedException(response.message || 'Comment failed');
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to post comment');
    }
  }

  @Put('/edit-comment')
  @UseGuards(AuthGuard)
  async editComment(
    @Req() req: Request,
    @Body()
    body: {
      id: number;
      content: string;
      song_id: number;
    },
  ) {
    try {
      const { id, content, song_id } = body;

      const response = await lastValueFrom(
        this.socialService
          .send('edit-comment', {
            user: req['user'],
            id,
            content,
            song_id,
          })
          .pipe(
            catchError((err) => {
              return of({
                error: err.message,
                message: 'Unable to edit comment',
              });
            }),
          ),
      );

      if (response?.error) {
        throw new UnauthorizedException(
          response.message || 'Comment editting failed',
        );
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to edit comment');
    }
  }

  @Delete('/delete-comment')
  @UseGuards(AuthGuard)
  async deleteComment(
    @Req() req: Request,
    @Body()
    body: {
      id: number;
    },
  ) {
    try {
      const { id } = body;

      const response = await lastValueFrom(
        this.socialService
          .send('delete-comment', {
            user: req['user'],
            id,
          })
          .pipe(
            catchError((err) => {
              return of({
                error: err.message,
                message: 'Unable to delete comment',
              });
            }),
          ),
      );

      if (response?.error) {
        throw new UnauthorizedException(
          response.message || 'Comment deleting failed',
        );
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to delete comment');
    }
  }

  @Post('/create-artist-follow')
  @UseGuards(AuthGuard)
  async createArtistFollow(
    @Req() req: Request,
    @Body()
    body: {
      artist_id: number;
    },
  ) {
    try {
      const { artist_id } = body;

      const response = await lastValueFrom(
        this.socialService
          .send('create-artist-follow', {
            user: req['user'],
            artist_id,
          })
          .pipe(
            catchError((err) => {
              return of({
                error: err.message,
                message: 'Unable to follow',
              });
            }),
          ),
      );

      if (response?.error) {
        throw new UnauthorizedException(response.message || 'Follow failed');
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to follow an artist');
    }
  }

  @Get('/get-all-follow')
  @UseGuards(AuthGuard)
  async getAllFollow(@Req() req: Request) {
    try {
      const response = await lastValueFrom(
        this.socialService
          .send('get-all-follow', {
            user: req['user'],
          })
          .pipe(
            catchError((err) => {
              return of({
                error: err.message,
                message: 'Unable to get follow',
              });
            }),
          ),
      );

      if (response?.error) {
        throw new UnauthorizedException(response.message || 'Get failed');
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to get all following');
    }
  }

  @Delete('/delete-artist-follow')
  @UseGuards(AuthGuard)
  async deleteArtistFollow(
    @Req() req: Request,
    @Body()
    body: {
      artist_id: number;
    },
  ) {
    try {
      const { artist_id } = body;

      const response = await lastValueFrom(
        this.socialService
          .send('delete-artist-follow', {
            user: req['user'],
            artist_id,
          })
          .pipe(
            catchError((err) => {
              return of({
                error: err.message,
                message: 'Unable to unfollow',
              });
            }),
          ),
      );

      if (response?.error) {
        throw new UnauthorizedException(response.message || 'Unfollow failed');
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to unfollow an artist');
    }
  }

  @Post('/create-friend')
  @UseGuards(AuthGuard)
  async createFriend(
    @Req() req: Request,
    @Body()
    body: {
      friend_id: number;
    },
  ) {
    try {
      const { friend_id } = body;

      const response = await lastValueFrom(
        this.socialService
          .send('create-friend', {
            user: req['user'],
            friend_id,
          })
          .pipe(
            catchError((err) => {
              return of({
                error: err.message,
                message: 'Unable to make friend',
              });
            }),
          ),
      );

      if (response?.error) {
        throw new UnauthorizedException(
          response.message || 'Friend request failed',
        );
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to create friend');
    }
  }

  @Get('/get-all-friends')
  @UseGuards(AuthGuard)
  async getAllFriends(@Req() req: Request) {
    try {
      const response = await lastValueFrom(
        this.socialService
          .send('get-all-friends', {
            user: req['user'],
          })
          .pipe(
            catchError((err) => {
              return of({
                error: err.message,
                message: 'Unable to get friend list',
              });
            }),
          ),
      );

      if (response?.error) {
        throw new UnauthorizedException(response.message || 'Get failed');
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to get all friends');
    }
  }

  @Delete('/delete-friend')
  @UseGuards(AuthGuard)
  async deleteFriend(
    @Req() req: Request,
    @Body()
    body: {
      friend_id: number;
    },
  ) {
    try {
      const { friend_id } = body;

      const response = await lastValueFrom(
        this.socialService
          .send('delete-friend', {
            user: req['user'],
            friend_id,
          })
          .pipe(
            catchError((err) => {
              return of({
                error: err.message,
                message: 'Unable to unfriend',
              });
            }),
          ),
      );

      if (response?.error) {
        throw new UnauthorizedException(response.message || 'Unfriend failed');
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Failed to unfriend');
    }
  }

  // api streaming
  @Get('/play-song-by-id/:songId')
  @Header('Content-Type', 'audio/mpeg')
  @Header('Content-Disposition', 'inline')
  async playSongById(@Param('songId') songId: number, @Res() res: Response) {
    const song = await lastValueFrom(
      this.catalogService.send('get-song-detail-by-song-id', { songId }).pipe(
        catchError((err) => {
          return of({
            err,
            message: 'Unable to get song detail',
          });
        }),
      ),
    );

    const fileKey = new URL(song.file_url).pathname.substring(1);
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
    });

    try {
      const response = await this.s3Client.send(command);

      if (!response.Body) {
        throw new HttpException('File not found in S3', HttpStatus.NOT_FOUND);
      }

      (response.Body as NodeJS.ReadableStream).pipe(res);
    } catch (error) {
      throw new HttpException(
        `Failed to stream file: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // api streaming session
  @Post('/streaming/session')
  async createStreamingSession(
    @Body()
    body: {
      songId: number;
      userId: number;
    },
  ) {
    const response = await lastValueFrom(
      this.streamingService.send('create-streaming-session', body).pipe(
        catchError((err) => {
          return of({
            err,
            message: 'Unable to create streaming session',
          });
        }),
      ),
    );

    if (response?.err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return response;
  }

  // api streaming session pause
  @Patch('/streaming/session/:sessionId/pause')
  async pauseStreamingSession(@Param('sessionId') sessionId: number) {
    const response = await lastValueFrom(
      this.streamingService.send('pause-streaming-session', { sessionId }).pipe(
        catchError((err) => {
          return of({
            err,
            message: 'Unable to pause streaming session',
          });
        }),
      ),
    );

    if (response?.err) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    }

    return response;
  }

  // api streaming session resume
  @Patch('/streaming/session/:sessionId/resume')
  async resumeStreamingSession(@Param('sessionId') sessionId: number) {
    const response = await lastValueFrom(
      this.streamingService
        .send('resume-streaming-session', { sessionId })
        .pipe(
          catchError((err) => {
            return of({
              err,
              message: 'Unable to resume streaming session',
            });
          }),
        ),
    );

    if (response?.err) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    }

    return response;
  }

  // api streaming/sessions/user
  @Get('/streaming/sessions/user')
  @UseGuards(AuthGuard)
  async getStreamingSessionsByUser(@Req() req: Request) {
    const sessions = await lastValueFrom(
      this.streamingService
        .send('get-streaming-sessions-by-user', { user: req['user'] })
        .pipe(
          catchError((err) => {
            throw new HttpException(
              'Unable to get streaming sessions by user',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }),
        ),
    );

    if (sessions?.err) {
      throw new HttpException(
        'No sessions found for this user',
        HttpStatus.NOT_FOUND,
      );
    }

    const enhancedSessions = await Promise.all(
      sessions.map(async (session) => {
        const song = await lastValueFrom(
          this.catalogService
            .send('get-song-detail-by-song-id', { songId: session.song_id })
            .pipe(catchError(() => of(null))),
        );
        return { ...session, song };
      }),
    );

    return enhancedSessions;
  }

  @Get('/streaming/session/:sessionId')
  async getStreamingSessionById(@Param('sessionId') sessionId: number) {
    const session = await lastValueFrom(
      this.streamingService
        .send('get-streaming-session-by-id', { sessionId })
        .pipe(
          catchError((err) => {
            return of({
              err,
              message: 'Unable to get streaming session by id',
            });
          }),
        ),
    );

    if (session?.err) {
      throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    }

    const song = await lastValueFrom(
      this.catalogService
        .send('get-song-detail-by-song-id', { songId: session.song_id })
        .pipe(
          catchError((err) => {
            return of({
              err,
              message: 'Unable to get song detail',
            });
          }),
        ),
    );

    return { ...session, song };
  }

  @Get('/search-song')
  async searchSong(@Query('keyword') keyword: string) {
    if (!keyword) {
      throw new UnauthorizedException('Keyword is required');
    }

    const query = {
      query: {
        multi_match: {
          query: keyword,
          fields: ['song_name', 'description'],
          fuzziness: 'AUTO',
        },
      },
    };

    const response = await lastValueFrom(
      this.searchService.send('search-song', query).pipe(
        catchError((err) => {
          console.error('Error in searchService.search-song:', err);
          return of({
            error: true,
            message:
              'Internal server error while searching songs in search service',
            details: err.message,
          });
        }),
      ),
    );

    if (response?.error) {
      throw new UnauthorizedException(response.message || 'Search failed');
    }

    return response;
  }
}
