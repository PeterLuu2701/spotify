import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create-comment')
  async createComment(
    @Payload()
    data: {
      user: any;
      content: string;
      song_id: number;
    },
  ) {
    const { user, content, song_id } = data;

    return this.appService.createComment(user, content, song_id);
  }

  @MessagePattern('get-all-comments')
  getAllComments() {
    return this.appService.getAllComments();
  }

  @MessagePattern('edit-comment')
  async editComment(
    @Payload()
    data: {
      user: any;
      id: number;
      content: string;
      song_id: number;
    },
  ) {
    const { user, id, content, song_id } = data;

    return this.appService.editComment(user, id, content, song_id);
  }

  @MessagePattern('delete-comment')
  async deleteComment(
    @Payload()
    data: {
      user: any;
      id: number;
    },
  ) {
    const { user, id } = data;

    return this.appService.deleteComment(user, id);
  }

  @MessagePattern('create-artist-follow')
  async createArtistFollow(
    @Payload()
    data: {
      user: any;
      artist_id: number;
    },
  ) {
    const { user, artist_id } = data;

    return this.appService.createArtistFollow(user, artist_id);
  }

  @MessagePattern('get-all-follow')
  async getAllFollow(
    @Payload()
    data: {
      user: any;
    },
  ) {
    const { user } = data;

    return this.appService.getAllFollow(user);
  }

  @MessagePattern('delete-artist-follow')
  async deleteArtistFollow(
    @Payload()
    data: {
      user: any;
      artist_id: number;
    },
  ) {
    const { user, artist_id } = data;

    return this.appService.deleteArtistFollow(user, artist_id);
  }

  @MessagePattern('create-friend')
  async createFriend(
    @Payload()
    data: {
      user: any;
      friend_id: number;
    },
  ) {
    const { user, friend_id } = data;

    return this.appService.createFriend(user, friend_id);
  }

  @MessagePattern('get-all-friends')
  async getAllFriends(
    @Payload()
    data: {
      user: any;
    },
  ) {
    const { user } = data;

    return this.appService.getAllFriends(user);
  }

  @MessagePattern('delete-friend')
  async deleteFriend(
    @Payload()
    data: {
      user: any;
      friend_id: number;
    },
  ) {
    const { user, friend_id } = data;

    return this.appService.deleteFriend(user, friend_id);
  }
}
