import { Snippet } from '@prisma/client';

export interface GetAllSnippets {
  snippets: Snippet[];
  totalPages: number;
}
