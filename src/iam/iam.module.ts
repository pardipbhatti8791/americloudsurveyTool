import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt-config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()), // register jwt
    ConfigModule.forFeature(jwtConfig), // to injected by auth service
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    PrismaService,
    AuthenticationService,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
