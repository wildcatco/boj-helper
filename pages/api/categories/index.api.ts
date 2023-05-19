import { createHandler } from '@/libs/api/create-handler';
import { getAllCategories } from '@/pages/api/categories/get-all-categories';

const handler = createHandler({ authRequired: true });

handler.get(getAllCategories);

export default handler;
