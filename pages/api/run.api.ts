import { NextApiResponse } from 'next';

import { array, object, string } from 'yup';

import { createHandler } from '@/libs/api/create-handler';
import { JUDGE0_LANGUAGE_ID } from '@/libs/constants/judge0';
import { createSubmission, getSubmission } from '@/services/judge0';
import { RunCodeResponse } from '@/types/dto/run/run-code';
import { ErrorResponse } from '@/types/error-response';

const handler = createHandler({ authRequired: true });

const postSchema = object({
  language: string().required(),
  code: string().required(),
  testCases: array(
    object({
      input: string().required(),
      output: string().required(),
    })
  ).required(),
});

handler.post(
  async (req, res: NextApiResponse<RunCodeResponse | ErrorResponse>) => {
    if (!postSchema.isValidSync(req.body)) {
      return res.status(400).json({
        errorName: 'BadRequestBody',
        message: '잘못된 요청입니다.',
      });
    }

    const { language, code, testCases } = req.body;

    try {
      const tokenList = await createSubmission({
        code,
        languageId: JUDGE0_LANGUAGE_ID[language],
        testCases,
      });

      const submissionResults = await getSubmission(tokenList);

      const results = submissionResults.map((result, index) => ({
        caseNumber: index + 1,
        input: testCases[index].input,
        expected: testCases[index].output,
        output: result.output,
        pass: result.pass,
        error: result.error,
      }));

      res.json({ results });
    } catch (error) {
      res.status(500).json({
        errorName: 'RunServerError',
        message: 'judge0 서버 에러.',
      });
    }
  }
);

export default handler;
