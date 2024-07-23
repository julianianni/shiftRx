import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserDto } from '../user/dto/user.dto';
import { UserLoginDto } from './dto/userLoginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserDto,
    description: 'Successfully registered',
  })
  async signUp(@Body() body: UserLoginDto): Promise<UserDto> {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user details',
    type: LoginPayloadDto,
  })
  async signIn(@Body() body: UserLoginDto): Promise<LoginPayloadDto> {
    return this.authService.signIn(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user details',
    type: UserDto,
  })
  async getProfile(@Request() req): Promise<UserDto> {
    return req.user;
  }
}
