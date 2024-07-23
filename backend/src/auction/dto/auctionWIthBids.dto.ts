import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AuctionDto } from './auction.dto';
import { BidDto } from '../../bid/dto/bid.dto';

export class AuctionWithBids {
  @Type(() => AuctionDto)
  @ApiProperty({ type: [AuctionDto] })
  auctions: AuctionDto[];

  @Type(() => BidDto)
  @ApiProperty({ type: [BidDto] })
  bids: BidDto[];

  constructor(auctiosnDto: AuctionDto[], bidsDto: BidDto[]) {
    this.auctions = auctiosnDto;
    this.bids = bidsDto;
  }
}
