import { KeyValuePair, RestRequest } from '@/types/restClient';
import { ReadonlyURLSearchParams } from 'next/navigation';

const CLIENT_PAGE = '/client';

export const composeUrl = (req: RestRequest) => {
  const initPath = CLIENT_PAGE + '/';
  const encodedUrl = req.url ? btoa(req.url) : undefined;
  const encodedBody = req.body ? btoa(req.body) : undefined;
  const headers = req.headers ? headersToString(req.headers) : undefined;
  const vars = [req.method, encodedUrl, encodedBody, headers];

  const newPath = vars.reduce((acc, param) => {
    return param ? acc?.concat(`${param}/`) : acc;
  }, initPath);
  return newPath?.slice(0, -1) ?? initPath;
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
