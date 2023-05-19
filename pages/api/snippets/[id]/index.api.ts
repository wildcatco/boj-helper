import { createHandler } from '@/libs/api/create-handler';
import { deleteSnippet } from '@/pages/api/snippets/[id]/delete-snippet';
import { updateSnippet } from '@/pages/api/snippets/[id]/update-snippet';

const handler = createHandler({ authRequired: true });

handler.post(updateSnippet);
handler.delete(deleteSnippet);

export default handler;
