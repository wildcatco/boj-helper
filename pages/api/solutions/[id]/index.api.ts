import { deleteSolution } from './delete-solution';
import { getSolution } from './get-solution';
import { updateSolution } from './update-solution';
import { createHandler } from '@/libs/api/create-handler';

const handler = createHandler({ authRequired: true });

handler.get(getSolution);
handler.post(updateSolution);
handler.delete(deleteSolution);

export default handler;
