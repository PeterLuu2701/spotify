import { Body, Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // createPlayList
  @MessagePattern('create-playlist')
  createPlaylist(@Payload() data: { token: string; playlist_name: string ; description: string; is_public: boolean; image: string }) {
    const token = data.token.replace('Bearer ', '');
    const { playlist_name, description, is_public, image } = data;
    return this.appService.createPlaylist(token, playlist_name, description, is_public, image);
  }

  // deletePlaylist
  @MessagePattern('delete-playlist')
  deletePlaylist(@Payload() data: { token: string; playlist_id: number }) {
    const token = data.token.replace('Bearer ', '');
    const { playlist_id } = data;
    return this.appService.deletePlaylist(token, playlist_id);
  }

  // editPlayList
  @MessagePattern('edit-playlist')
  editPlaylist(@Payload() data: { token: string; playlist_id: number; playlist_name: string ; description: string; is_public: boolean; image: string }) {
    const token = data.token.replace('Bearer ', '');
    const { playlist_id, playlist_name, description, is_public, image } = data;
    return this.appService.editPlaylist(token, playlist_id, playlist_name, description, is_public, image);
  }

  // getPlayListById
  @MessagePattern('get-playlist-by-playlist-id')
  getPlaylistByPlaylistId(@Payload() data: { playlistId: number }) {
    const { playlistId } = data
    return this.appService.getPlaylistByPlaylistId(playlistId);
  }

  // getPlayListByUser
  @MessagePattern('get-playlist-by-user-id')
  getPlaylistByUserId(@Payload() data: { userId: number }) {
    const { userId } = data
    return this.appService.getPlaylistByUserId(userId);
  }

  // createSong
  @MessagePattern('edit-playlist')
  editPlaylist(@Payload() data: { token: string; playlist_id: number; playlist_name: string ; description: string; is_public: boolean; image: string }) {
    const token = data.token.replace('Bearer ', '');
    const { playlist_id, playlist_name, description, is_public, image } = data;
    return this.appService.editPlaylist(token, playlist_id, playlist_name, description, is_public, image);
  }

  
}
