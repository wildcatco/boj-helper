import { ParsedUrlQuery } from 'querystring';

export const getQueryString = (
  query: ParsedUrlQuery | Record<string, string>,
  allowedKeys?: string[]
) => {
  // query ordering (swr key값 일정하게)
  const keys = Object.keys(query);
  keys.sort();

  let qs = '';
  keys.forEach((key) => {
    if (query[key] && (allowedKeys ? allowedKeys.includes(key) : true)) {
      qs += `${key}=${encodeURIComponent(query[key] as string)}&`;
    }
  });

  if (qs.endsWith('&')) {
    qs = qs.slice(0, -1);
  }

  return qs;
};
