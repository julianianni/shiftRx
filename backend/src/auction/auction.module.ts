import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule, // Assuming PrismaService is exported from PrismaModule
  ],
  providers: [AuctionService],
  controllers: [AuctionController],
})
export class AuctionModule {}
