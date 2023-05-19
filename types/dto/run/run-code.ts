import { ExecutionResult } from '@/types/execution-result';
import { Language } from '@/types/language';
import { Example } from '@/types/problem';

export interface RunCodeBody {
  language: Language;
  code: string;
  testCases: Example[];
}

export interface RunCodeResponse {
  results: ExecutionResult[];
}
