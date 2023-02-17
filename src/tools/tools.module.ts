import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/iam/config/jwt-config';

@Module({
  controllers: [ToolsController],
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()), // register jwt
    ConfigModule.forFeature(jwtConfig), // to injected by auth service
  ],
  providers: [ToolsService, PrismaService],
})
export class ToolsModule {}
