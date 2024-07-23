import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { PrismaService } from '../prisma/prisma.service';
import { BidGateway } from './bid.gateway';

@Module({
  controllers: [BidController],
  providers: [BidService, PrismaService, BidGateway],
  exports: [BidService],
})
export class BidModule {}
