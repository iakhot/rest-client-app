'use client';
import sendRequest from '@/app/actions';
import { MessageContext } from '@/components/common/MessageContextProvider';
import { auth } from '@/firebase/config';
import { RestRequest, RestResponse } from '@/types/restClient';
import { Box, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ResponseView from '@/components/rest-client/ResponseView';
import { useClientStore } from '@/store/clientStore';

const RequestEditor = lazy(
  () => import('@/components/rest-client/RequestEditor')
);

function RestClient() {
  const [user] = useAuthState(auth);
  const saveResponse = useClientStore((state) => state.addResponse);
  const cleanupHeaders = useClientStore((state) => state.cleanupHeaders);
  const storedResp = useClientStore((state) => state.response);
  const [textResponse, setTextResponse] = useState<RestResponse | Error>(
    storedResp as RestResponse
  );
  const { addSnackMessage } = useContext(MessageContext);

  const t = useTranslations('RequestEditor');

  const handleSend = async (request: RestRequest) => {
    const result = await sendRequest(request, user?.uid);
    if ((result as { error: Error }).error) {
      setTextResponse({});
      saveResponse({});
      addSnackMessage({
        text:
          t('sendError') + JSON.stringify((result as { error: Error }).error),
        messageType: 'error',
      });
    } else {
      setTextResponse(result as RestResponse);
      saveResponse(result as RestResponse);
      addSnackMessage({
        text: t('sendSuccess'),
        messageType: 'success',
      });
    }
  };

  useEffect(() => {
    return () => {
      saveResponse({});
      cleanupHeaders();
    };
  }, [saveResponse, cleanupHeaders]);

  return (
    <Box
      width="100%"
      paddingLeft={4}
      justifyItems={'center'}
      sx={{ backgroundColor: '#292929', backgroundClip: 'content-box' }}
    >
      <Suspense fallback={<p>Loading...</p>}>
        <RequestEditor onSend={handleSend} />
      </Suspense>

      <br />

      {!(textResponse instanceof Error) ? (
        <Stack
          justifySelf={'flex-start'}
          paddingX={{ xs: '3%', md: '8%' }}
          width={'100%'}
        >
          <ResponseView
            statusResp={textResponse.status}
            body={textResponse.body}
          />
        </Stack>
      ) : null}
    </Box>
  );
}

export default RestClient;
