import { CommentError } from './comment.error';

export class CommentNotFoundError extends CommentError {
  constructor(message: string) {
    super(message);
  }
}
