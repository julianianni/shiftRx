import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: { email: string; password: string }) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('login')
  async signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
