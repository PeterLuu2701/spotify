import { Body, Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // createPlayList
  @MessagePattern('create-playlist')
  createPlaylist(@Payload() data: { user: any; playlist_name: string ; description: string; is_public: boolean; image: string }) {
    const { user, playlist_name, description, is_public, image } = data;
    return this.appService.createPlaylist(user, playlist_name, description, is_public, image);
  }

  // deletePlaylist
  @MessagePattern('delete-playlist')
deletePlaylist(@Payload() data: { user: any; playlist_id: number }) {
  const { user, playlist_id } = data;
  return this.appService.deletePlaylist(user, playlist_id);
}

  // editPlayList
  @MessagePattern('edit-playlist')
  editPlaylist(@Payload() data: { user: any; playlist_id: number; playlist_name: string ; description: string; is_public: boolean; image: string }) {
    const { user, playlist_id, playlist_name, description, is_public, image } = data;
    return this.appService.editPlaylist(user, playlist_id, playlist_name, description, is_public, image);
  }

  // addSongToPlaylist
  @MessagePattern('add-song-to-playlist')
  addSongToPlaylist(@Payload() data: { user: any; playlist_id: number; song_id: number }) {
    const { user, playlist_id, song_id } = data;
    return this.appService.addSongToPlaylist(user, playlist_id, song_id);
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

  
}
