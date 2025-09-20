'use client';
import React from 'react';
import { Tab, Box, Tabs } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';

function NavMenuAuth() {
  const [user] = useAuthState(auth);
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const t = useTranslations('Home');

  return (
    <Box
      sx={{
        width: 180,
        borderRight: 1,
        borderColor: 'divider',
        // height: '60vh',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ height: '100%' }}
      >
        <Tab component={Link} href="/client" label={t('restClient')} />
        <Tab
          component={Link}
          href={`/history?user=${user?.uid}`}
          label={t('history')}
        />
        <Tab component={Link} href="/variables" label={t('variables')} />
      </Tabs>
    </Box>
  );
}

export default NavMenuAuth;
