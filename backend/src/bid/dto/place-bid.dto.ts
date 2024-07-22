import { IsNumber } from 'class-validator';

export class PlaceBidDto {
  @IsNumber()
  readonly amount: number;
}
