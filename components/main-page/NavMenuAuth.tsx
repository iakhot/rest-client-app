'use client';
import { SyntheticEvent, useLayoutEffect, useState } from 'react';
import { Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { usePathname } from '@/i18n/navigation';
import sidebarInitTab from '@/service/sidebarInitTab';

function NavMenuAuth() {
  const [user] = useAuthState(auth);
  const theme = useTheme();
  const pathname = usePathname().slice(1).toLowerCase();
  const currentTab = sidebarInitTab(pathname);
  const [value, setValue] = useState(currentTab);

  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const t = useTranslations('Home');

  useLayoutEffect(() => {
    setValue(currentTab);
  }, [currentTab]);

  return (
    <Tabs
      component="nav"
      orientation={isSmUp ? 'vertical' : 'horizontal'}
      variant="scrollable"
      value={value}
      onChange={handleChange}
      aria-label="Content tabs"
      sx={{
        flexBasis: 200,
        flexShrink: 0,
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <Tab component={Link} href="/main" label={t('main')} />
      <Tab component={Link} href="/client" label={t('restClient')} />
      <Tab
        component={Link}
        href={`/history?user=${user?.uid}`}
        label={t('history')}
      />
    </Tabs>
  );
}

export default NavMenuAuth;
