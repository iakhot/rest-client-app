import { KeyValuePair, RestRequest } from '@/types/restClient';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const composeUrl = (
  pageSlug: string,
  path: string,
  req: RestRequest
) => {
  const index = path.indexOf(pageSlug);
  let newPath = path;
  const encodedUrl = req.url ? btoa(req.url) : undefined;
  const encodedBody = req.body ? btoa(req.body) : undefined;
  const headers = req.headers ? headersToString(req.headers) : undefined;
  const vars = [req.method, encodedUrl, encodedBody, headers];

  if (index !== -1) {
    const initPath = path.slice(0, index + pageSlug.length) + '/';
    newPath = initPath;
    for (const param of vars) {
      if (!param) break;
      newPath = newPath.concat(`${param}/`);
    }
  }
  return newPath.slice(0, -1);
};

export const headersToString = (headers: Record<string, string>): string => {
  let queryString = '';
  Object.entries(headers).forEach(([key, value]) => {
    if (key) {
      const enValue = encodeURIComponent(value);
      queryString += `${key}=${enValue}&`;
    }
  });
  return queryString ? `?${queryString.slice(0, -1)}` : queryString;
};

export const headersFromSearchParams = (query: ReadonlyURLSearchParams) => {
  const pairs: Record<string, string> = {};
  query.entries().forEach(([key, value]) => {
    pairs[key] = decodeURIComponent(value);
  });
  return pairs;
};

export const getHeaderPairs = (headers: KeyValuePair[]) => {
  return headers.reduce(
    (acc, header) => {
      acc[header.key] = header.value;
      return acc;
    },
    {} as Record<string, string>
  );
};
