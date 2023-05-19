import { Snippet } from '@prisma/client';

import { Language } from '@/types/language';

export interface CreateSnippetBody {
  name: string;
  code: string;
  language: Language;
}

export interface CreateSnippetResponse {
  snippet: Snippet;
}
