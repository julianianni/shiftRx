import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BidGateway } from './bid.gateway';
import { BidDto } from './dto/bid.dto';

@Injectable()
export class BidService {
  constructor(
    private prisma: PrismaService,
    private bidsGateway: BidGateway,
  ) {}

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
    if (Date.now() > auction.endTime.getTime()) {
      throw new Error('Bid has already expired');
    }

    if (auction.userId === userId) {
      throw new ConflictException('You cannot bid on your own auction');
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

    await this.bidsGateway.broadcastNewBid(String(bid.auctionId), bid);

    return bid;
  }

  async findBidsByAuctionId(auctionId: number) {
    const bids = await this.prisma.bid.findMany({
      where: { auctionId },
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });

    return bids.map((bid) => new BidDto(bid));
  }
}
