import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: 'Please enter your email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Please enter your password' })
  @MinLength(10)
  password: string;
}
