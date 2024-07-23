import { IsNumber, IsOptional, IsString } from 'class-validator';
import { NonUpdatedAbstractDto } from '../../shared/AbstractDto';
import { Auction, Bid, User } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserDto } from '../../user/dto/user.dto';

export class BidDto extends NonUpdatedAbstractDto {
  @ApiProperty()
  @IsNumber()
  readonly amount: number;

  @Type(() => UserDto)
  @ApiProperty()
  @IsNumber()
  readonly user: UserDto;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  readonly auctionTitle: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  readonly auctionId: number;

  constructor(bid: Bid & { user?: User } & { auction?: Auction }) {
    super(bid);

    if (bid.user) {
      this.user = new UserDto(bid.user);
    }
    if (bid.auction) {
      this.auctionTitle = bid.auction.title;
    }
    if (bid.auction) {
      this.auctionId = bid.auction.id;
    }

    this.amount = bid.amount;
  }
}
