export type CreateSubmissionResponse = { token: string }[];

export interface GetSubmissionResponse {
  submissions: {
    stdout: string | null;
    time: string | null;
    memory: number | null;
    stderr: string | null;
    token: string;
    message: string | null;
    status: {
      id: number;
      description: string;
    };
  }[];
}
