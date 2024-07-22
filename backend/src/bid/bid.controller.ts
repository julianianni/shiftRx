import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BidService } from './bid.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('auctions/:id/bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async placeBid(
    @Param('id') auctionId: number,
    @Body('amount') amount: number,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.bidService.placeBid(Number(auctionId), userId, Number(amount));
  }

  @Get()
  async getBids(@Param('id') auctionId: number) {
    return this.bidService.getBids(Number(auctionId));
  }
}
