import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/models';
import type { Repository } from '@project/core';

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

  public async findById(id: string): Promise<CommentEntity | null> {
    const existingRow = await this.prismaClientService.comment.findUnique({
      where: { id },
    });

    if (!existingRow) {
      return null;
    }

    return new CommentEntity(existingRow);
  }

  public async findByPostId(postId: string): Promise<CommentEntity[]> {
    const existingRows = await this.prismaClientService.comment.findMany({
      where: { postId },
    });
    return existingRows.map((row) => new CommentEntity(row));
  }

  public async update(
    id: string,
    entity: CommentEntity,
  ): Promise<CommentEntity> {
    const updatedRow = await this.prismaClientService.comment.update({
      where: { id },
      data: entity.convertToObject(),
    });
    return new CommentEntity(updatedRow);
  }

  public async deleteById(id: string): Promise<void> {
    await this.prismaClientService.comment.delete({ where: { id } });
  }
}
