import { Overlay } from './../overlays/entities/overlay.entity';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';
import { Request } from 'express';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/iam/config/jwt-config';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LayersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async create(createLayerDto: CreateLayerDto, requestData: Request) {
    try {
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
      return this.prismaService.layers.create({
        data: {
          title: createLayerDto.title,
          description: createLayerDto.description,
          img: createLayerDto.img,
          userId: {
            connect: { id: payload.sub },
          },
          toolId: {
            connect: { id: createLayerDto.tool_id },
          },
          overlayId: {
            connect: { id: createLayerDto.overlay_id },
          },
        },
        include: {
          userId: true,
          toolId: true,
          overlayId: true,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  findAll() {
    return this.prismaService.layers.findMany();
  }

  findOne(id: number) {
    return this.prismaService.layers.findUnique({ where: { id: id } });
  }

  update(id: number, updateLayerDto: UpdateLayerDto) {
    return `This action updates a #${id} layer`;
  }

  remove(id: number) {
    return this.prismaService.layers.delete({ where: { id: id } });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }

  findOverLayId(id: number) {
    return this.prismaService.layers.findMany({
      where: { overlay_id: Number(id) },
      include: {
        toolId: true,
        overlayId: true,
      },
    });
  }

  findAllTools() {
    console.log('inside findAllTools');
    return this.prismaService.tools.findMany({
      include: {
        layers: true,
      },
    });
  }
}
