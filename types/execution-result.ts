export interface ExecutionResult {
  caseNumber: number;
  input: string;
  output: string | null;
  expected: string;
  pass: boolean;
  error: string | null;
}
