import axios from 'axios';

import {
  CreateSubmissionResponse,
  GetSubmissionResponse,
} from '@/types/dto/submission';
import { TestCase } from '@/types/problem';
import { TestResult } from '@/types/test-result';

export function encode(str: string) {
  return btoa(unescape(encodeURIComponent(str || '')));
}

export function decode(bytes: string | null) {
  if (!decode) return null;
  const escaped = escape(atob(bytes || ''));
  try {
    return decodeURIComponent(escaped);
  } catch {
    return unescape(escaped);
  }
}

export const createSubmission = async ({
  code,
  languageId,
  testCases,
}: {
  code: string;
  languageId: number;
  testCases: TestCase[];
}) => {
  const response = await axios.post<CreateSubmissionResponse>(
    `${process.env.JUDGE_URL}/submissions/batch`,
    {
      submissions: testCases.map((testCase) => ({
        language_id: languageId,
        source_code: encode(code),
        stdin: encode(testCase.input),
        expected_output: encode(testCase.output),
      })),
    },

    {
      headers: { 'Content-Type': 'application/json' },
      params: { base64_encoded: true },
      timeout: 5000,
    }
  );

  const tokenList = response.data.map(({ token }) => token);

  return tokenList;
};

export const getSubmission = async (tokenList: string[]) => {
  const inQueueList = [...tokenList];

  const results: TestResult[] = Array(tokenList.length);
  while (inQueueList.length) {
    const tokenParam = 'tokens=' + inQueueList.join(',');
    const response = await axios.get<GetSubmissionResponse>(
      `${process.env.JUDGE_URL}/submissions/batch?${tokenParam}`,
      {
        params: {
          base64_encoded: true,
        },
        timeout: 5000,
      }
    );

    response.data.submissions.forEach((submission) => {
      // submission status
      // 1: in queue 2: processing 3: correct
      // 4: wrong 5: time limit 6: compile error
      // 7~12: runtime error 13: internal error
      if (submission.status.id > 2) {
        const { stdout, stderr, token, status } = submission;
        const index = tokenList.indexOf(token);
        results[index] = {
          output: decode(stdout),
          error: decode(stderr),
          pass: status.id === 3,
        };

        const indexToRemove = inQueueList.indexOf(token);
        inQueueList.splice(indexToRemove, 1);
      }
    });
  }

  return results;
};
