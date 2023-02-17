import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOverlayDto {
  @ApiProperty({ description: 'Title is required filed' })
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  description: string;
}
