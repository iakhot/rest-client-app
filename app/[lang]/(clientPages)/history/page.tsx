import { Accordion, Stack, Typography } from '@mui/material';
import Summary from '@/components/history-accordion/summary';
import { getTranslations } from 'next-intl/server';
import { getHistory } from '@/app/dbActions';
import { lazy } from 'react';
import { redirect } from 'next/navigation';

const DetailsLazy = lazy(
  () => import('@/components/history-accordion/details')
);

type HistoryProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const History = async ({ searchParams }: HistoryProps) => {
  const t = await getTranslations('History');
  const params = await searchParams;
  const userId = params.user as string | undefined;
  if (!userId) {
    redirect('/');
  }
  const history = await getHistory(userId);

  return (
    <Stack paddingX={4} height="100%" overflow={'auto'}>
      <Typography component={'h3'} marginBottom={2}>
        {t('title')}
      </Typography>
      {history.length === 0 ? (
        <Typography color="text.secondary">No history available</Typography>
      ) : (
        history.map((historyItem, index) => {
          return (
            <Accordion key={historyItem.uuid}>
              <Summary historyItem={historyItem} index={index} />
              <DetailsLazy historyItem={historyItem} />
            </Accordion>
          );
        })
      )}
    </Stack>
  );
};

export default History;
