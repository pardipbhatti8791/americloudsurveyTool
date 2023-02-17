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
import { LayersService } from './layers.service';
import { CreateLayerDto } from './dto/create-layer.dto';
import { UpdateLayerDto } from './dto/update-layer.dto';

@Controller('api/v1/layers')
export class LayersController {
  constructor(private readonly layersService: LayersService) {}

  @Post()
  create(@Body() createLayerDto: CreateLayerDto, @Request() requestData) {
    return this.layersService.create(createLayerDto, requestData);
  }

  @Get()
  findAll() {
    return this.layersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.layersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLayerDto: UpdateLayerDto) {
    return this.layersService.update(+id, updateLayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.layersService.remove(+id);
  }
}
