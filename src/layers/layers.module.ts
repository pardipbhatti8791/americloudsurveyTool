import { Module } from '@nestjs/common';
import { LayersService } from './layers.service';
import { LayersController } from './layers.controller';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt-config';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LayersController],
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()), // register jwt
    ConfigModule.forFeature(jwtConfig), // to injected by auth service
  ],
  providers: [LayersService, PrismaService]
})
export class LayersModule {}
