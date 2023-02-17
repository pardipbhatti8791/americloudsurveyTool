import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createProjectDto: CreateProjectDto) {
    try {
      console.log('createProjectDto___', createProjectDto);
      return this.prismaService.projects.create({
        data: {
          title: createProjectDto.title,
          vanue_title: createProjectDto.vanue_title,
          conducted_by: createProjectDto.conducted_by,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  findAll() {
    return this.prismaService.projects.findMany();
  }

  findOne(id: number) {
    try {
      return this.prismaService.projects.findUnique({ where: { id: id } });
    } catch (err) {
      throw err;
    }
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    try {
      return this.prismaService.projects.delete({ where: { id: id } });
    } catch (err) {
      throw err;
    }
  }
}
