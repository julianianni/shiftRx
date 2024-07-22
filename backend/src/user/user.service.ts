import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
  }

  async login(loginUserDto: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      return { access_token: token };
    }

    throw new Error('Invalid credentials');
  }

  async getProfile(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }

  async deleteUser(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
