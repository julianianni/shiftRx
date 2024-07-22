'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';

export class LoginPayloadDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  constructor(user: UserDto) {
    this.user = user;
  }
}
