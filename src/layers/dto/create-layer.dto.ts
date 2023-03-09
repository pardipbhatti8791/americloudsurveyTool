import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLayerDto {
  @ApiProperty({ description: 'Title is required field' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Please select Overlay' })
  @IsNumber()
  overlay_id: number;

  @ApiProperty({ description: 'Please select Tool' })
  @IsNumber()
  tool_id: number;

  @ApiProperty()
  img: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  thickness: number;

  @ApiProperty()
  shapeImage: string;

  @ApiProperty()
  colorCode: string;

  @ApiProperty()
  height: number;

  @ApiProperty()
  width: number;

  @ApiProperty()
  thicknessType: string;

  @ApiProperty()
  heightType: string;

  @ApiProperty()
  widthType: string;
}
