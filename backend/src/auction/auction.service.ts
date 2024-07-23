import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { AuctionDto } from './dto/auction.dto';
import { BidDto } from '../bid/dto/bid.dto';
import { AuctionWithBids } from './dto/auctionWIthBids.dto';

@Injectable()
export class AuctionService {
  constructor(private prisma: PrismaService) {}

  async createAuction(createAuctionDto: CreateAuctionDto, userId: number) {
    const { title, description, startingPrice, currentPrice, endTime } =
      createAuctionDto;
    const createdAuction = await this.prisma.auction.create({
      data: {
        title,
        description,
        startingPrice,
        currentPrice: currentPrice || startingPrice,
        // Automatic 7 days from now
        endTime: endTime || new Date(Date.now() + 1000 * 7 * 60 * 60 * 24),
        userId,
      },
    });

    const auction = await this.prisma.auction.findUnique({
      where: { id: createdAuction.id },
    });

    return new AuctionDto(auction);
  }

  async getAuctions() {
    const auctionsEntity = await this.prisma.auction.findMany({
      where: { endTime: { gte: new Date() } },
      orderBy: { createdAt: 'asc' },
    });

    return auctionsEntity.map((auc) => new AuctionDto(auc));
  }

  async getAuction(id: number) {
    const auctionEntity = await this.prisma.auction.findUnique({
      where: { id },
    });

    return new AuctionDto(auctionEntity);
  }

  async updateAuction(
    id: number,
    updateAuctionDto: UpdateAuctionDto,
    userId: string,
  ) {
    //validate the auction userId is the same as the user id of the request
    const auction = await this.prisma.auction.findUnique({
      where: { id: Number(id) },
    });

    if (!auction) {
      throw new NotFoundException('Could not found action with id: ' + id);
    }

    if (Number(auction.userId) !== Number(userId)) {
      throw new UnauthorizedException(
        'You cannot update an auction that is not yours',
      );
    }

    return this.prisma.auction.update({
      where: { id: Number(auction.id) },
      data: updateAuctionDto,
    });
  }

  async deleteAuction(id: number) {
    return this.prisma.auction.delete({
      where: { id },
    });
  }

  async getMyActionsWithBids(userId: number) {
    const auctions = await this.prisma.auction.findMany({
      where: { userId },
      include: { bids: { include: { user: true } } },
    });

    const myBids = await this.prisma.bid.findMany({
      where: { userId },
      include: {
        auction: { include: { bids: { include: { user: true } } } },
      },
    });

    const auctionsDtos = auctions.map((auc) => new AuctionDto(auc, auc.bids));

    const bidDtos = myBids.map((bid) => new BidDto(bid));

    return new AuctionWithBids(auctionsDtos, bidDtos);
  }
}
