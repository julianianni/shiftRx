'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';

export class LoginPayloadDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty()
  accessToken: string;

  constructor(user: UserDto, accessToken: string) {
    this.user = user;
    this.accessToken = accessToken;
  }
}
