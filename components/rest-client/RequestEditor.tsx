'use client';

import { UrlBox, UrlInput, UrlMenuItem } from '@/style/styledRequestInputs';
import {
  HttpMethods,
  httpMethodsValues,
  RestRequest,
} from '@/types/restClient';
import { Box, Button, Toolbar } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState, FocusEvent, useCallback } from 'react';
import RequestSettings from './RequestSettings';
import {
  composeUrl,
  getHeaderPairs,
  headersFromSearchParams,
} from '@/service/urlUtils';
import { useTranslations } from 'next-intl';
import { useClientStore } from '@/store/clientStore';

function RequestEditor({
  onSend,
}: {
  onSend: (_req: RestRequest) => Promise<void>;
}) {
  const { slug } = useParams();
  const router = useRouter();
  const query = useSearchParams();
  const t = useTranslations('RequestEditor');

  const initRequest: RestRequest = {
    method: 'GET',
    url: '',
  };

  if (slug) {
    initRequest.method = slug[0].toUpperCase() as HttpMethods;
    initRequest.url = slug[1] ? atob(decodeURIComponent(slug[1])) : '';
    initRequest.body = slug[2] ? atob(decodeURIComponent(slug[2])) : undefined;
    initRequest.headers = headersFromSearchParams(query);
  }

  const [request, setRequest] = useState<RestRequest>(initRequest);
  const headers = useClientStore((store) => store.headers);
  if (headers.length > 0) {
    request.headers = getHeaderPairs(headers);
  }

  const handleMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSlug = event.target.value;
    setRequest({ ...request, method: newSlug as HttpMethods });
    router.replace(
      composeUrl({
        ...request,
        method: newSlug as HttpMethods,
      })
    );
  };

  const handleUrlBlur = (event: FocusEvent<HTMLInputElement>) => {
    const url = event.target.value.trim();
    setRequest({ ...request, url: url });
  };

  const handleBodyChange = useCallback(
    (body: string) => {
      setRequest({ ...request, body: body });
    },
    [request]
  );

  const handleSend = () => {
    const payload: RestRequest = {
      ...request,
      body: request.body ? btoa(request.body) : undefined,
    };
    onSend(payload);
    router.replace(composeUrl(request));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: { md: 800 },
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <UrlBox id="wrapper">
          <UrlInput
            id="method"
            value={request.method}
            select
            onChange={handleMethodChange}
            sx={{ width: '98px' }}
          >
            {httpMethodsValues.map((m) => (
              <UrlMenuItem key={m} value={m}>
                {m}
              </UrlMenuItem>
            ))}
          </UrlInput>
          <UrlInput
            id="url"
            variant="outlined"
            placeholder={t('urlPlaceholder')}
            value={request.url}
            onBlur={handleUrlBlur}
            onChange={(e) =>
              setRequest({ ...request, url: e.currentTarget.value })
            }
            sx={{ flexGrow: 2, border: 0 }}
          ></UrlInput>
        </UrlBox>
        <Button
          id="send"
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSend}
        >
          {t('send')}
        </Button>
      </Toolbar>
      <RequestSettings
        initialBody={request.body}
        onBodyChange={handleBodyChange}
      />
    </Box>
  );
}

export default RequestEditor;
