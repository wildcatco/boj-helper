export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/problems', '/snippets', '/exercise', '/solve/:id*'],
};
