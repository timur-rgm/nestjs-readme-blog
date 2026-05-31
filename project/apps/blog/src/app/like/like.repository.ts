import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/models';

import { LikeEntity } from './like.entity';

@Injectable()
export class LikeRepository {
  constructor(private readonly prismaClientService: PrismaClientService) {}

  public async save(entity: LikeEntity): Promise<LikeEntity> {
    const createdRow = await this.prismaClientService.like.create({
      data: entity.convertToObject(),
    });
    return new LikeEntity(createdRow);
  }

  public async findByPostIdAndUserId(
    postId: string,
    userId: string,
  ): Promise<LikeEntity | null> {
    const existingRow = await this.prismaClientService.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (!existingRow) {
      return null;
    }
    return new LikeEntity(existingRow);
  }

  public async deleteByPostIdAndUserId(
    postId: string,
    userId: string,
  ): Promise<void> {
    await this.prismaClientService.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }
}
