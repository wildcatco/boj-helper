import { runCode } from '@/services/run-code';

self.addEventListener('message', async (e) => {
  const { error, results } = await runCode({
    ...e.data,
  });

  self.postMessage({
    error,
    results,
  });
});
