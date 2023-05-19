import {
  initializeDB,
  createProblems,
  getTestUser,
  createCategories,
  createSolutions,
  createSnippets,
} from './utils';
import { PrismaClient } from '@prisma/client';
import cliProgress from 'cli-progress';

const prisma = new PrismaClient();

const pbar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

async function main() {
  console.log('db 초기화 중...');
  await initializeDB();

  const user = await getTestUser();
  if (!user) {
    throw new Error('테스트 유저가 존재하지 않습니다.');
  }

  console.log('문제 생성 중...');
  await createProblems();

  console.log('카테고리 생성 중...');
  const categories = await createCategories(user);

  const NUM_ITERATION = 1;
  console.log('풀이 생성 중...');
  pbar.start(NUM_ITERATION, 0);
  for (let i = 0; i < NUM_ITERATION; i++) {
    await createSolutions(user, categories);
    pbar.update(i + 1);
  }
  pbar.stop();

  console.log('코드 스니핏 생성 중...');
  pbar.start(NUM_ITERATION, 0);
  for (let i = 0; i < NUM_ITERATION; i++) {
    await createSnippets(user);
    pbar.update(i + 1);
  }
  pbar.stop();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
