'use client';
import { Typography, Button, Container, Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('GlobalError');
  useEffect(() => {
    console.error(`Uncaught exception: ${error}`);
  }, [error]);

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h2" component="h2">
          {t('title')}
          {'...'}
        </Typography>
      </Box>
      <Button variant="contained" onClick={() => reset()}>
        {t('retry')}
      </Button>
    </Container>
  );
}
