import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AwsS3Service } from '../../api-gateway/src/aws-s3.service';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    JwtModule.register({ secret: 'token' }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AwsS3Service, AuthService],
})
export class AppModule {}
