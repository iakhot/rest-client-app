'use server';

import { RestResponse } from '@/types/restClient';

const wrapServerError = (error: unknown) => {
  return {
    error: {
      name: (error as Error)?.name,
      message: (error as Error)?.message,
    },
  };
};

export default async function sendRequest(
  url: string,
  method = 'GET',
  body?: string
) {
  try {
    const start = performance.now();

    const stringBody =
      method !== 'GET' && body
        ? Buffer.from(body, 'base64').toString('utf8')
        : undefined;

    return fetch(url, {
      referrer: '',
      method: method,
      body: stringBody,
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
        const size = Number.parseFloat(
          res.headers.get('Content-Length') ?? ''
        ).toFixed(2);

        const result: RestResponse = {
          body,
          duration,
          size,
          status,
          statusText,
        };

        return result;

        //TODO: save stats to BD
      })
      .catch((error) => {
        return wrapServerError(error);
      });
  } catch (error) {
    return wrapServerError(error);
  }
}
