import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('login-user')
  logIn(@Body() user) {
    return this.appService.logIn(user);
  }

  @MessagePattern('sign-up')
  async signUp(
    @Body() body: { 
      name: string; 
      email: string; 
      password: string;
      avatar: string;
      description: string;
      banner: string;
      nationality: string 
    },
  ) {
    try {
      const { name, email, password, avatar, description, banner, nationality } = body;
      return await this.appService.signUp(name, email, password, avatar, description, banner, nationality);
    } catch (error) {
      throw error
    }
  }
}
