'use server';
import { RestRequest, RestResponse } from '@/types/restClient';
import { equalTo, get, orderByChild, query, ref, set } from 'firebase/database';
import { database } from '@/firebase/config';
import { wrapServerError } from '@/service/errorUtils';
import { RequestHistory } from '@/types/history';

export async function saveRequest(
  request: RestRequest,
  response: RestResponse,
  userId?: string
) {
  const uuid = crypto.randomUUID();
  return set(ref(database, `history/${uuid}`), {
    userId,
    endpoint: request.url,
    requestDuration: response.duration ?? '',
    requestMethod: request.method,
    requestHeaders: request.headers ? JSON.stringify(request.headers) : '',
    requestBody: request.body ?? '',
    requestSize: request.size ?? '',
    requestTimestamp: request.timestamp ?? 0,
    responseSize: response.size ?? '',
    responseStatus: response.status ?? 0,
    errorDetails: response.statusText ?? '',
  });
}

export async function getHistory(userId: string) {
  const q = query(
    ref(database, 'history'),
    orderByChild('userId'),
    equalTo(userId)
  );
  return get(q)
    .then((snapshot) => {
      const data: RequestHistory[] = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          data.push({
            ...childSnapshot.val(),
            uuid: childSnapshot.key,
          } as RequestHistory);
        });
        data.sort((a, b) => b.requestTimestamp - a.requestTimestamp);
      }
      return data;
    })
    .catch((error) => {
      throw wrapServerError(error);
    });
}
