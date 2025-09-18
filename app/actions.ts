'use server';

import { RestRequest, RestResponse } from '@/types/restClient';
import { saveRequest } from './dbActions';
import { wrapServerError } from '@/service/errorUtils';

const getSummarySize = (body?: string, headers?: Headers) => {
  const bodySize = Buffer.byteLength(body ?? '');
  const headersSize = headers ? Buffer.byteLength(JSON.stringify(headers)) : 0;
  return (bodySize + headersSize).toFixed(2);
};

export default async function sendRequest(
  request: RestRequest,
  userId?: string
) {
  try {
    const { url, method, headers, body } = request;
    const timestamp = Date.now();
    const start = performance.now();

    const stringBody =
      method !== 'GET' && body
        ? Buffer.from(body, 'base64').toString('utf8')
        : undefined;
    const reqHeaders = new Headers(headers);

    return fetch(url, {
      referrer: '',
      method: method,
      body: stringBody,
      headers: reqHeaders,
    })
      .then(async (res) => {
        const end = performance.now();

        if (!res.ok) {
          console.log(`REST API Error: ${res.status} ${res.statusText}`);
        }
        const duration = (end - start).toFixed(2);
        const status = res.status;
        const statusText = res.statusText;
        const body = await res.text();
        const size = getSummarySize(body, res.headers);

        const result: RestResponse = {
          body,
          duration,
          size,
          status,
          statusText,
        };

        request.size = getSummarySize(stringBody, reqHeaders);
        saveRequest(
          { ...request, body: stringBody, timestamp: timestamp },
          result,
          userId
        ).catch((error) => console.log(`DB error: ${error}`));

        return result;
      })
      .catch((error) => {
        return wrapServerError(error);
      });
  } catch (error) {
    return wrapServerError(error);
  }
}
