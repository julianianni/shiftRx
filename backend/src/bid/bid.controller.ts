import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BidService } from './bid.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { PlaceBidDto } from './dto/place-bid.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BidDto } from './dto/bid.dto';

@Controller('auctions/:id/bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async placeBid(
    @Param('id') auctionId: number,
    @Body() placeBidDto: PlaceBidDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.bidService.placeBid(
      Number(auctionId),
      userId,
      Number(placeBidDto.amount),
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Bids by Auction Id',
    type: [BidDto],
  })
  async getBids(@Param('id') auctionId: number): Promise<BidDto[]> {
    return this.bidService.findBidsByAuctionId(Number(auctionId));
  }
}
