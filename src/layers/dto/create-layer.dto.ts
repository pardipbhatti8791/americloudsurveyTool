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
}
