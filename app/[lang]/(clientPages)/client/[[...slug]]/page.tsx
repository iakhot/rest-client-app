'use client';
import sendRequest from '@/app/actions';
import { MessageContext } from '@/components/common/MessageContextProvider';
import { auth } from '@/firebase/config';
import { RestRequest, RestResponse } from '@/types/restClient';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { lazy, Suspense, useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ResponseView from '@/components/rest-client/ResponseView';

const RequestEditor = lazy(
  () => import('@/components/rest-client/RequestEditor')
);

function RestClient() {
  const [user] = useAuthState(auth);
  const [textResponse, setTextResponse] = useState<RestResponse | Error>({});
  const { addSnackMessage } = useContext(MessageContext);
  const t = useTranslations('RequestEditor');

  const handleSend = async (request: RestRequest) => {
    const result = await sendRequest(request, user?.uid);
    if ((result as { error: Error }).error) {
      setTextResponse({});
      addSnackMessage({
        text:
          t('sendError') + JSON.stringify((result as { error: Error }).error),
        messageType: 'error',
      });
    } else {
      setTextResponse(result as RestResponse);
      addSnackMessage({
        text: t('sendSuccess'),
        messageType: 'success',
      });
    }
  };

  return (
    <Box width="100%" paddingLeft={4}>
      <Suspense fallback={<p>Loading...</p>}>
        <RequestEditor onSend={handleSend} />
      </Suspense>

      <br />

      {!(textResponse instanceof Error) ? (
        <ResponseView
          statusResp={textResponse.status}
          body={textResponse.body}
        />
      ) : null}
    </Box>
  );
}

export default RestClient;
