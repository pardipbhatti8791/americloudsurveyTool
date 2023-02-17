import { Module } from '@nestjs/common';
import { OverlaysService } from './overlays.service';
import { OverlaysController } from './overlays.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/iam/config/jwt-config';

@Module({
  controllers: [OverlaysController],
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()), // register jwt
    ConfigModule.forFeature(jwtConfig), // to injected by auth service
  ],
  providers: [OverlaysService, PrismaService],
})
export class OverlaysModule {}
