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
      user: any,
      content: string,
      song_id: number,
    },
  ) {
    const { user, content, song_id } = data;

    return this.appService.createComment(user, content, song_id, );
  }

  @MessagePattern('get-all-comments')
  getAllComments() {
    return this.appService.getAllComments();
  }
}
