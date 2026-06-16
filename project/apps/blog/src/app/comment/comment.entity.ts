import type { Comment } from '@project/types';
import type { Entity } from '@project/core';

export class CommentEntity implements Comment, Entity<string, Comment> {
  public id?: string;
  public text!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public postId!: string;
  public userId!: string;

  constructor(comment: Comment) {
    this.fillFromObject(comment);
  }

  public convertToObject(): Comment {
    return {
      id: this.id,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      userId: this.userId,
    };
  }

  private fillFromObject(comment: Comment): void {
    this.id = comment.id;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.postId = comment.postId;
    this.userId = comment.userId;
  }
}
