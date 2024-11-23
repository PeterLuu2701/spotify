import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create-streaming-session')
  createStreamingSession(data: any) {
    return this.appService.createStreamingSession(data);
  }

  @MessagePattern('pause-streaming-session')
  pauseStreamingSession(data: any) {
    return this.appService.pauseStreamingSession(data);
  }

  @MessagePattern('resume-streaming-session')
  resumeStreamingSession(data: any) {
    return this.appService.resumeStreamingSession(data);
  }
  //get-streaming-sessions-by-user
  @MessagePattern('get-streaming-sessions-by-user')
  getStreamingSessionsByUser(data: { user: any }) {
    const { user } = data;
    return this.appService.getStreamingSessionsByUser(user);
  }

  @MessagePattern('get-streaming-session-by-id')
  getStreamingSessionById(data: any) {
    return this.appService.getStreamingSessionById(data);
  }
}
