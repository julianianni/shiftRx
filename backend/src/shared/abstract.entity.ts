'use strict';

import { ApiProperty } from '@nestjs/swagger';

export abstract class AbstractEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export abstract class NonUpdatedAbstractEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;
}
