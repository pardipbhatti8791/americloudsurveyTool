import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('Authentication Module')
@Controller('api/v1/auth')
export class AuthenticationController {
  constructor(private readonly authSevice: AuthenticationService) {}

  @Post('/sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authSevice.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authSevice.signIn(signInDto);
  }
}
