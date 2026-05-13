import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/models';
import type { EntityIdType, Repository } from '@project/core';

import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentRepository implements Repository<CommentEntity> {
  constructor(private readonly prismaClientService: PrismaClientService) {}

  public async save(entity: CommentEntity): Promise<CommentEntity> {
    const createdRow = await this.prismaClientService.comment.create({
      data: entity.convertToObject(),
    });
    return new CommentEntity(createdRow);
  }

  public async findById(id: EntityIdType): Promise<CommentEntity | null> {
    const existingRow = await this.prismaClientService.comment.findUnique({
      where: { id },
    });

    if (!existingRow) {
      return null;
    }

    return new CommentEntity(existingRow);
  }

  public async update(
    id: EntityIdType,
    entity: CommentEntity,
  ): Promise<CommentEntity> {
    const updatedRow = await this.prismaClientService.comment.update({
      where: { id },
      data: entity.convertToObject(),
    });
    return new CommentEntity(updatedRow);
  }

  public async deleteById(id: EntityIdType): Promise<void> {
    await this.prismaClientService.comment.delete({ where: { id } });
  }
}
