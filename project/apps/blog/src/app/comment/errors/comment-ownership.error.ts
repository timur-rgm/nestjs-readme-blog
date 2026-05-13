import { CommentError } from './comment.error';

export class CommentOwnershipError extends CommentError {
  constructor(message: string) {
    super(message);
  }
}
