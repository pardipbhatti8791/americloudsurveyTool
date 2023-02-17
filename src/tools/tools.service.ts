import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt-config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { Request } from 'express';

@Injectable()
export class ToolsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async create(createToolDto: CreateToolDto, requestData: Request) {
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
      return this.prismaService.tools.create({
        data: {
          title: createToolDto.title,
          description: createToolDto.description,
          img: createToolDto.img,
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
    return this.prismaService.tools.findMany();
  }

  findOne(id: number) {
    return this.prismaService.tools.findUnique({ where: { id: id } });
  }

  update(id: number, updateToolDto: UpdateToolDto) {
    return `This action updates a #${id} tool`;
  }

  remove(id: number) {
    return this.prismaService.tools.delete({ where: { id: id } });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
