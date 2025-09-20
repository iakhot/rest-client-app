import { RequestHistory } from '@/types/history';
import { AccordionDetails, Stack, Typography } from '@mui/material';
import { getTranslations } from 'next-intl/server';

type DetailsProps = { historyItem: RequestHistory };

const Details = async ({ historyItem }: DetailsProps) => {
  const t = await getTranslations('History');
  return (
    <AccordionDetails>
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={3}>
        <Stack direction={'row'} flexWrap={'wrap'}>
          <Typography
            component="span"
            sx={{ color: 'text.secondary', marginRight: 1 }}
          >
            {t('status')}
          </Typography>
          <Typography
            component="span"
            color={historyItem.responseStatus < 400 ? 'get' : 'delete'}
          >
            {historyItem.responseStatus}
          </Typography>
        </Stack>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('duration') + historyItem.requestDuration + 'ms'}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('requestSize') + historyItem.requestSize + 'B'}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('responseSize') + historyItem.responseSize + 'B'}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('errorDetails') + historyItem.errorDetails}
        </Typography>
      </Stack>
    </AccordionDetails>
  );
};

export default Details;
