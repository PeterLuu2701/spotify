import { Body, Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // createPlayList
  @MessagePattern('create-playlist')
  createPlaylist(
    @Payload() data: { token: string; playlist_name: string }
  ) {
    const token = data.token.replace('Bearer ', '');
  const { playlist_name } = data;
    return this.appService.createPlaylist(token, playlist_name);
  }

  // deletePlaylist
  // editPlayList
  // getPlayListById
  // getPlayListByUser

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
