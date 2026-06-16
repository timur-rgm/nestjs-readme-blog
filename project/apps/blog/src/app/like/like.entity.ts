import type { Entity } from '@project/core';
import type { Like } from '@project/types';

export class LikeEntity implements Like, Entity<string, Like> {
  public id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public postId!: string;
  public userId!: string;

  constructor(like: Like) {
    this.fillFromObject(like);
  }

  public convertToObject(): Like {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      userId: this.userId,
    };
  }

  private fillFromObject(like: Like): void {
    this.id = like.id;
    this.createdAt = like.createdAt;
    this.updatedAt = like.updatedAt;
    this.postId = like.postId;
    this.userId = like.userId;
  }
}
