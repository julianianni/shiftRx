import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { User } from '../user/user.decorator';
import { AuctionService } from './auction.service';
import { ApiResponse } from '@nestjs/swagger';
import { AuctionDto } from './dto/auction.dto';
import { AuctionWithBids } from './dto/auctionWIthBids.dto';

@Controller('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Creates an auction and return the auctionDto created',
    type: AuctionDto,
  })
  async createAuction(
    @Body() createAuctionDto: CreateAuctionDto,
    @User() user,
  ): Promise<AuctionDto> {
    return this.auctionService.createAuction(createAuctionDto, user.id);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get actions',
    type: [AuctionDto],
  })
  async getAuctions(): Promise<AuctionDto[]> {
    return this.auctionService.getAuctions();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my-auctions')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get my auctions with bids',
    type: AuctionWithBids,
  })
  async getMyAuctionsWithBids(@User() user): Promise<AuctionWithBids> {
    return this.auctionService.getMyActionsWithBids(user.id);
  }

  @Get(':id')
  async getAuction(@Param('id') id: string) {
    return this.auctionService.getAuction(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateAuction(
    @Param('id') id: number,
    @Body() updateAuctionDto: UpdateAuctionDto,
    @User() user,
  ) {
    return this.auctionService.updateAuction(id, updateAuctionDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAuction(@Param('id') id: number) {
    return this.auctionService.deleteAuction(id);
  }
}
