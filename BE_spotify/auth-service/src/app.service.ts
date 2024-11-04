import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async logIn(user: any) {
    let { email, password } = user;

    let checkUser = await this.prismaService.users.findFirst({
      where: {
        email,
        password,
      },
    });

    if (checkUser) {
      let token = this.jwtService.sign({ userId: checkUser.id });
      return token;
    } else {
      return 'Wrong email or password';
    }
  }

  async signUp(
    name: string,
    email: string,
    password: string,
    avatar: string,
    description: string,
    banner: string,
    nationality: string,
  ) {
    const user = await this.prismaService.users.create({
      data: {
        name,
        email,
        password,
        avatar,
        description,
        banner,
        nationality,
        role: 'user',
      },
    });

    return user;
  }
}
