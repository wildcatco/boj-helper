import axios from 'axios';
import * as cheerio from 'cheerio';

import { prisma } from '@/libs/db/prisma';
import { Problem } from '@/types/problem';

export const findProblemFromDB = async (
  problemId: string
): Promise<Problem | null> => {
  return prisma.problem.findUnique({
    where: {
      id: problemId,
    },
    include: {
      examples: true,
    },
  });
};

export const crawlProblem = async (id: string): Promise<Problem | null> => {
  try {
    const response = await axios.get<string>(
      `https://www.acmicpc.net/problem/${id}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        },
      }
    );

    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('span#problem_title').text().trim();
    let descriptionHtml = $('div#problem_description').html()!.trim();
    const inputHtml = $('div#problem_input').html()!.trim();
    const outputHtml = $('div#problem_output').html()!.trim();
    const limitHtml = $('div#problem_limit').html()?.trim() || null;
    const associations = $('section#problem_association')
      .find('ul > li > a')
      .toArray()
      .map((el) => parseInt($(el).text().split('.')[0]));

    const examples = [];
    let exampleNumber = 1;
    while (true) {
      const inputExampleHtml = $(`#sample-input-${exampleNumber}`).html();
      const outputExampleHtml = $(`#sample-output-${exampleNumber}`).html();

      if (inputExampleHtml && outputExampleHtml) {
        examples.push({
          input: inputExampleHtml.trim(),
          output: outputExampleHtml.trim(),
        });
        exampleNumber += 1;
      } else {
        break;
      }
    }

    // 이미지 src base url 지정
    descriptionHtml = descriptionHtml.replaceAll(
      'src="/upload',
      'src="https://www.acmicpc.net/upload'
    );
    descriptionHtml = descriptionHtml.replaceAll(
      'src="/JudgeOnline/upload',
      'src="https://www.acmicpc.net/JudgeOnline/upload'
    );

    return {
      id,
      title,
      descriptionHtml,
      inputHtml,
      outputHtml,
      limitHtml,
      examples,
      associations,
    };
  } catch (err) {
    return null;
  }
};

export const saveProblem = async (problem: Problem) => {
  await prisma.problem.create({
    data: {
      id: problem.id,
      title: problem.title,
      descriptionHtml: problem.descriptionHtml,
      inputHtml: problem.inputHtml,
      outputHtml: problem.outputHtml,
      limitHtml: problem.limitHtml,
      associations: problem.associations,
    },
  });

  for (const example of problem.examples) {
    await prisma.example.create({
      data: {
        input: example.input,
        output: example.output,
        problem: {
          connect: {
            id: problem.id,
          },
        },
      },
    });
  }
};
