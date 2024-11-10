export interface Example {
  number: number;
  input: string;
  output: string;
  explain: string | null;
}

export interface Problem {
  id: string;
  title: string;
  descriptionHtml: string;
  inputHtml: string;
  outputHtml: string;
  limitHtml: string | null;
  examples: Example[];
  associations: number[];
}
