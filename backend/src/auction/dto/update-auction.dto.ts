import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class UpdateAuctionDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly startingPrice?: number;

  @IsOptional()
  @IsDateString()
  readonly endTime?: Date;
}
