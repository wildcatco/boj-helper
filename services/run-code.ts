import axios, { AxiosError } from 'axios';

import { convertAxiosErrorToApiError } from '@/libs/api/api-error';
import { RunCodeBody, RunCodeResponse } from '@/types/dto/run/run-code';
import { ExecutionResult } from '@/types/execution-result';

export const runCode = async ({ language, code, testCases }: RunCodeBody) => {
  const results: ExecutionResult[] = [];
  if (language === 'python') {
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      function* stdinGenerator() {
        for (const line of testCase.input.split('\n')) {
          yield line;
        }
      }

      const stdinIt = stdinGenerator();

      function stdinFunc() {
        return stdinIt.next().value;
      }

      let output = '';
      function stdoutFunc(msg: string) {
        output += msg + '\n';
      }

      try {
        // @ts-ignore
        const pyodide = await loadPyodide({
          stdin: stdinFunc,
          stdout: stdoutFunc,
        });
        // bug workaround (https://github.com/pyodide/pyodide/issues/3112)
        let newCode = code.replace(/print\(/g, 'print("thisistemp"), print(');
        newCode = `${newCode}\nprint("thisistemp")`;
        pyodide.runPython(newCode);
        output = output.replaceAll('thisistemp\n', '');

        results.push({
          caseNumber: i + 1,
          input: testCase.input,
          expected: testCase.output,
          pass: testCase.output.trimEnd() === output.trimEnd(),
          output,
          error: null,
        });
      } catch (err) {
        if (err instanceof Error && err.name === 'PythonError') {
          const separator = 'File "<exec>", ';
          const error = err.message.split(separator).slice(1).join(separator);
          results.push({
            caseNumber: i + 1,
            input: testCase.input,
            expected: testCase.output,
            pass: false,
            output: null,
            error,
          });
        } else {
          return { results: null, error: err };
        }
      }
    }
    return { results, error: null };
  }

  if (language === 'javascript') {
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      let newCode = code.replace('const fs = require("fs")', '');
      newCode = newCode.replace("const fs = require('fs')", '');
      newCode = newCode.replace(
        "fs.readFileSync('/dev/stdin').toString().trim()",
        `\`${testCase.input}\``
      );
      newCode = `\nlet output = '';\n(function () {\n${newCode}\n})()`;
      newCode = newCode.replace(
        /console\.log\(([\s\S]*?)\);/g,
        'output += $1;'
      );
      newCode = `${newCode}\nreturn output;`;
      newCode = `(function () {\n${newCode}\n})()`;

      try {
        const output = String(eval(newCode)).trim();

        results.push({
          caseNumber: i + 1,
          input: testCase.input,
          expected: testCase.output,
          pass: testCase.output === output,
          output,
          error: null,
        });
      } catch (err) {
        results.push({
          caseNumber: i + 1,
          input: testCase.input,
          expected: testCase.output,
          pass: false,
          output: null,
          error: err as string,
        });
      }
    }
    return { results, error: null };
  }

  try {
    const response = await axios.post<RunCodeResponse>('/api/run', {
      language,
      code,
      testCases,
    });

    return { results: response.data.results, error: null };
  } catch (err) {
    if (err instanceof AxiosError) {
      const apiError = convertAxiosErrorToApiError(err);
      return { results: null, error: apiError };
    } else {
      return { results: null, error: err };
    }
  }
};
