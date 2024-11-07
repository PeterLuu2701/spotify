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

    let checkUser = await this.prismaService.dbUsersClient.users.findFirst({
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
    try {
      const invalidUser = await this.prismaService.dbUsersClient.users.findFirst({
        where: {
          email
        }
      })

      if (invalidUser){
        return 'This email has already exist'
      }
      
      const userInDbUsers = await this.prismaService.dbUsersClient.users.create(
        {
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
        },
      );

      const userInDbStreaming =
        await this.prismaService.dbStreamingClient.users.create({
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

      return { userInDbUsers, userInDbStreaming };
    } catch (error) {
      throw error;
    }
  }
}
