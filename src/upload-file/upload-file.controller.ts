import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly CloudinaryService: CloudinaryService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: any): Promise<any> {
    return await this.CloudinaryService.uploadImage(file);
  }
}
