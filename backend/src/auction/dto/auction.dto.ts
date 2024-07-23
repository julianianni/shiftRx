import { IsString, IsNumber, IsDateString } from 'class-validator';
import { AbstractDto } from '../../shared/AbstractDto';
import { Auction, Bid } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BidDto } from '../../bid/dto/bid.dto';

export class AuctionDto extends AbstractDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  currentPrice: number;

  @ApiProperty()
  @IsDateString()
  endTime: Date;

  @Type(() => BidDto)
  @ApiProperty({ type: [BidDto] })
  bids: BidDto[];

  constructor(auction: Auction, bids?: Bid[]) {
    super(auction);

    this.title = auction.title;
    this.description = auction.description;
    this.currentPrice = auction.currentPrice;
    this.endTime = auction.endTime;
    this.userId = auction.userId;

    if (bids) {
      this.bids = bids.map((bid) => new BidDto(bid));
    }
  }
}
