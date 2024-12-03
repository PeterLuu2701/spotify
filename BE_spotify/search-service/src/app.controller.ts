import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('index-song')
  indexDocument(@Payload() data: { index: string; id: string; document: any }) {
    return this.appService.indexDocument(data.index, data.id, data.document);
  }

  @MessagePattern('search-song')
  async searchSong(@Payload() query: any) {
    return this.appService.search('songs', query);
  }
}
