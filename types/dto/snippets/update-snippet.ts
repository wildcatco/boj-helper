import { Snippet } from '@prisma/client';

import { Language } from '@/types/language';

export interface UpdateSnippetBody {
  name?: string;
  code?: string;
  language?: Language;
}

export interface UpdateSnippetResponse {
  snippet: Snippet;
}
