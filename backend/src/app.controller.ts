import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('status')
  getStatus(): { status: string } {
    return { status: 'OK' };
  }
}
