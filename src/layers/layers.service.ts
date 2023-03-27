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
      return this.prismaService.layers.create({
        data: {
          title: createLayerDto.title,
          description: createLayerDto.description,
          img: createLayerDto.img,
          imgType: createLayerDto.imgType,
          type: createLayerDto.type,
          thickness: Number(createLayerDto.thickness),
          shapeImage: createLayerDto.shapeImage,
          shapeImageType: createLayerDto.shapeImageType,
          colorCode: createLayerDto.colorCode,
          height: createLayerDto.height,
          width: createLayerDto.width,
          thicknessType: createLayerDto.thicknessType,
          heightType: createLayerDto.heightType,
          widthType: createLayerDto.widthType,
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
    return this.prismaService.layers.update({
      data: {
        title: updateLayerDto.title,
        description: updateLayerDto.description,
        img: updateLayerDto.img,
        imgType: updateLayerDto.imgType,
        type: updateLayerDto.type,
        thickness: Number(updateLayerDto.thickness),
        shapeImage: updateLayerDto.shapeImage,
        shapeImageType: updateLayerDto.shapeImageType,
        colorCode: updateLayerDto.colorCode,
        height: updateLayerDto.height,
        width: updateLayerDto.width,
        thicknessType: updateLayerDto.thicknessType,
        heightType: updateLayerDto.heightType,
        widthType: updateLayerDto.widthType,
        toolId: {
          connect: { id: updateLayerDto.tool_id },
        },
        overlayId: {
          connect: { id: updateLayerDto.overlay_id },
        },
      },
      include: {
        userId: true,
        toolId: true,
        overlayId: true,
      },
      where: {
        id,
      },
    });
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

  includeOverlayIds(allTools: any) {
    const newTools = [...allTools];
    for (const tool of newTools) {
      const overlayIds = [];
      for (const layer of tool.layers) {
        if (!overlayIds.includes(layer.overlay_id)) {
          overlayIds.push(layer.overlay_id);
        }
      }
      tool.overlays = overlayIds;
    }
    return newTools;
  }

  async findAllTools() {
    const allTools = await this.prismaService.tools.findMany({
      include: {
        layers: true,
      },
    });
    return this.includeOverlayIds(allTools);
  }
}
