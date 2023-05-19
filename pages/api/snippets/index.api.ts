import { createHandler } from '@/libs/api/create-handler';
import { createSnippet } from '@/pages/api/snippets/create-snippet';
import { getSnippets } from '@/pages/api/snippets/get-snippets';

const handler = createHandler({ authRequired: true });

handler.get(getSnippets);
handler.post(createSnippet);

export default handler;
