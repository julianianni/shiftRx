import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';

@Injectable()
export class AuctionService {
  constructor(private prisma: PrismaService) {}

  async createAuction(createAuctionDto: CreateAuctionDto, userId: number) {
    const { title, description, startingPrice, endTime } = createAuctionDto;
    return this.prisma.auction.create({
      data: {
        title,
        description,
        startingPrice,
        currentPrice: startingPrice,
        // Automatic 7 days from now
        endTime: endTime || new Date(Date.now() + 1000 * 7 * 60 * 60 * 24),
        userId,
      },
    });
  }

  async getAuctions() {
    return this.prisma.auction.findMany({
      where: { endTime: { gte: new Date() } },
      orderBy: { endTime: 'asc' },
    });
  }

  async getAuction(id: number) {
    return this.prisma.auction.findUnique({
      where: { id },
    });
  }

  async updateAuction(id: number, updateAuctionDto: UpdateAuctionDto) {
    return this.prisma.auction.update({
      where: { id: Number(id) },
      data: updateAuctionDto,
    });
  }

  async deleteAuction(id: number) {
    return this.prisma.auction.delete({
      where: { id },
    });
  }
}
