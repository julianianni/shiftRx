import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    this.jwtService.sign({ userId: user.id });

    return new UserDto(user);
  }

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      this.jwtService.sign({ userId: user.id });
      return new LoginPayloadDto(new UserDto(user));
    }
    throw new Error('Invalid credentials');
  }
  async findUserById(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      return new UserDto(user);
    }
    throw new Error('User not found');
  }
}
