import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateAuctionDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly startingPrice: number;

  @IsOptional()
  @IsDateString()
  readonly endTime?: Date;

  @IsOptional()
  @IsDateString()
  readonly currentPrice?: number;
}
