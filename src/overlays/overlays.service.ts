import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOverlayDto } from './dto/create-overlay.dto';
import { UpdateOverlayDto } from './dto/update-overlay.dto';
import { Request } from 'express';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/iam/config/jwt-config';

@Injectable()
export class OverlaysService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async create(createOverlayDto: CreateOverlayDto, requestData: Request) {
    try {
      console.log('requestData___', requestData);
      const request = requestData;

      const token = this.extractTokenFromHeader(request);
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      if (!payload) {
        throw new UnauthorizedException('Invalid email/password');
      }
      console.log('payload', payload);
      return this.prismaService.overlays.create({
        data: {
          title: createOverlayDto.title,
          description: createOverlayDto.description,
          userId: {
            connect: { id: payload.sub },
          },
        },
        include: {
          userId: true,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  findAll() {
    return this.prismaService.overlays.findMany();
  }

  findOne(id: number) {
    return this.prismaService.overlays.findUnique({ where: { id: id } });
  }

  update(id: number, updateOverlayDto: UpdateOverlayDto) {
    return `This action updates a #${id} overlay`;
  }

  remove(id: number) {
    return this.prismaService.overlays.delete({ where: { id: id } });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
