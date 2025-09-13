'use client';
import sendRequest from '@/app/actions';
import { RestRequest, RestResponse } from '@/types/restClient';
import { lazy, Suspense, useState } from 'react';

const RequestEditor = lazy(
  () => import('@/components/rest-client/RequestEditor')
);

function RestClient() {
  const [textResponse, setTextResponse] = useState<RestResponse | Error>({});

  const handleSend = async (request: RestRequest) => {
    const { url, method, body } = request;

    const result = await sendRequest(url, method, body);
    if ((result as { error: Error }).error) {
      setTextResponse({});
      console.log(
        `Error sending request: ${JSON.stringify((result as { error: Error }).error)}`
      );
    } else {
      setTextResponse(result as RestResponse);
    }
  };

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <RequestEditor onSend={handleSend} />
      </Suspense>

      <hr />
      <br />
      <p>{(textResponse as RestResponse).body}</p>
    </div>
  );
}

export default RestClient;
