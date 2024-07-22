'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { User } from '@prisma/client';
import { AbstractDto } from '../../shared/AbstractDto';

export class UserDto extends AbstractDto {
  @ApiProperty()
  email: string;

  constructor(user: User) {
    super(user);
    this.email = user.email;
  }
}
