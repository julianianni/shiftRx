'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity, NonUpdatedAbstractEntity } from './abstract.entity';

export class AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(entity: AbstractEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}

export class NonUpdatedAbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  constructor(entity: NonUpdatedAbstractEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
  }
}
