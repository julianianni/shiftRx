import { IsNumber } from 'class-validator';
import { NonUpdatedAbstractDto } from '../../shared/AbstractDto';
import { Bid, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
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

  constructor(bid: Bid & { user: User }) {
    super(bid);

    this.user = new UserDto(bid.user);

    this.amount = bid.amount;
  }
}
