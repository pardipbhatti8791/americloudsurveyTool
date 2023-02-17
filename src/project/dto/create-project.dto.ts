import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: 'Title is required filed' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Vanue Title is required filed' })
  @IsNotEmpty()
  vanue_title: string;

  @ApiProperty({ description: 'Conducted By is required filed' })
  @IsNotEmpty()
  conducted_by: string;
}
