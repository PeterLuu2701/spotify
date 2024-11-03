import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get-all-song-card')
  getAllSongCard() {
    return this.appService.getAllSongCard();
  }

  @MessagePattern('get-all-artists')
  getAllArtists() {
    return this.appService.getAllArtists();
  }

  @MessagePattern('get-songs-by-artist')
  getSongsByArtist(@Payload() data: { artistId: number }) {
    return this.appService.getSongsByArtist(data.artistId);
  }

  @MessagePattern('get-all-genres')
  getAllGenres() {
    return this.appService.getAllGenres();
  }

  @MessagePattern('get-songs-by-genre')
  getSongsByGenres(@Payload() data: { genreId: number }) {
    const { genreId } = data
    return this.appService.getSongsByGenres(genreId);
  }

  // getSongById
  @MessagePattern('get-song-detail-by-song-id')
  getSongDetailBySongId(@Payload() data: { songId: number }) {
    const { songId } = data
    return this.appService.getSongDetailBySongId(songId);
  }
  
}
