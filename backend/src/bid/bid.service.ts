import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BidService {
  constructor(private prisma: PrismaService) {}

  async placeBid(auctionId: number, userId: number, amount: number) {
    const auction = await this.prisma.auction.findUnique({
      where: { id: auctionId },
    });

    if (!auction) {
      throw new Error('Auction not found');
    }

    if (amount <= auction.currentPrice) {
      throw new Error('Bid amount must be higher than the current price');
    }

    const bid = await this.prisma.bid.create({
      data: {
        auctionId,
        userId,
        amount,
      },
    });

    await this.prisma.auction.update({
      where: { id: auctionId },
      data: { currentPrice: amount },
    });

    return bid;
  }

  async getBids(auctionId: number) {
    return this.prisma.bid.findMany({
      where: { auctionId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
