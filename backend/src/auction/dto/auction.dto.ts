import { IsString, IsNumber, IsDateString } from 'class-validator';
import { AbstractDto } from '../../shared/AbstractDto';
import { Auction } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AuctionDto extends AbstractDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  currentPrice: number;

  @ApiProperty()
  @IsDateString()
  endTime: Date;

  constructor(auction: Auction) {
    super(auction);

    this.title = auction.title;
    this.description = auction.description;
    this.currentPrice = auction.currentPrice;
    this.endTime = auction.endTime;
  }
}
