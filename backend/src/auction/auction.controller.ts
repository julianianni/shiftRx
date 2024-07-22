import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { User } from '../user/user.decorator';
import { AuctionService } from './auction.service';

@Controller('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAuction(
    @Body() createAuctionDto: CreateAuctionDto,
    @User() user,
  ) {
    return this.auctionService.createAuction(createAuctionDto, user.id);
  }

  @Get()
  async getAuctions() {
    return this.auctionService.getAuctions();
  }

  @Get(':id')
  async getAuction(@Param('id') id: number) {
    return this.auctionService.getAuction(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateAuction(
    @Param('id') id: number,
    @Body() updateAuctionDto: UpdateAuctionDto,
  ) {
    return this.auctionService.updateAuction(id, updateAuctionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAuction(@Param('id') id: number) {
    return this.auctionService.deleteAuction(id);
  }
}
