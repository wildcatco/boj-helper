import { createHandler } from '@/libs/api/create-handler';
import { createOrUpdateSolution } from '@/pages/api/solutions/create-or-update-solution';
import { getSolutions } from '@/pages/api/solutions/get-solutions';

const handler = createHandler({ authRequired: true });

handler.get(getSolutions);
handler.post(createOrUpdateSolution);

export default handler;
