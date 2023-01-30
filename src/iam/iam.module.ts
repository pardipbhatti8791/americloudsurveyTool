import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
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
