import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { OverlaysService } from './overlays.service';
import { CreateOverlayDto } from './dto/create-overlay.dto';
import { UpdateOverlayDto } from './dto/update-overlay.dto';

@Controller('api/v1/overlays')
export class OverlaysController {
  constructor(private readonly overlaysService: OverlaysService) {}

  @Post()
  create(@Body() createOverlayDto: CreateOverlayDto, @Request() requestData) {
    return this.overlaysService.create(createOverlayDto, requestData);
  }

  @Get()
  findAll() {
    return this.overlaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.overlaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOverlayDto: UpdateOverlayDto) {
    return this.overlaysService.update(+id, updateOverlayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.overlaysService.remove(+id);
  }
}
