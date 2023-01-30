import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class Service {
  constructor(private readonly prismaService: PrismaService) {}

  async me(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

}
