import { problems } from './data/problems';
import { snippets } from './data/snippets';
import { solutions } from './data/solutions';
import { Category, PrismaClient, User } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();

const createTestUser = async () => {
  await prisma.user.create({
    data: {
      id: process.env.TEST_USER_ID as string,
      email: process.env.TEST_USER_EMAIL as string,
      provider: 'test',
    },
  });
};

export const getTestUser = () => {
  return prisma.user.findUnique({
    where: {
      email_provider: {
        email: process.env.TEST_USER_EMAIL as string,
        provider: 'test',
      },
    },
  });
};

export const initializeDB = async () => {
  await prisma.user.deleteMany();
  await prisma.problem.deleteMany();
  await createTestUser();
};

export const createProblems = async () => {
  await prisma.problem.createMany({
    data: problems.map((problem) => ({
      id: problem.id + '',
      title: problem.title,
      descriptionHtml: problem.descriptionHtml,
      inputHtml: problem.inputHtml,
      outputHtml: problem.outputHtml,
      limitHtml: problem.limitHtml,
      associations: problem.associations,
    })),
  });

  await prisma.example.createMany({
    data: problems
      .map((problem) => {
        return problem.examples.map((example) => ({
          input: example.input,
          output: example.output,
          problemId: problem.id + '',
        }));
      })
      .flat(),
  });
};

export const createCategories = async (user: User) => {
  await prisma.category.createMany({
    data: solutions.map((solution) => ({
      name: solution.categoryName,
      userId: user.id,
    })),
    skipDuplicates: true,
  });

  const categories = await prisma.category.findMany();

  return categories;
};

export const createSolutions = async (user: User, categories: Category[]) => {
  await prisma.solution.createMany({
    data: solutions.map((solution) => ({
      problemId: solution.problemId + '',
      code: solution.code,
      language: solution.language,
      difficulty: solution.difficulty,
      userId: user.id,
      categoryId: categories.find(
        (category) => category.name === solution.categoryName
      )!.id,
    })),
  });
};

export const createSnippets = async (user: User) => {
  await prisma.snippet.createMany({
    data: snippets.map((snippet) => ({
      name: `${snippet.name}`,
      language: snippet.language,
      code: snippet.code,
      userId: user.id,
    })),
  });
};
