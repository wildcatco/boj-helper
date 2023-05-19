export interface Example {
  input: string;
  output: string;
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
