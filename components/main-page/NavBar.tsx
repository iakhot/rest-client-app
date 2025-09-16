'use client';

import React from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Container,
  Button,
  MenuItem,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from '@mui/material';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { auth } from '@/firebase/config';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';

function NavBar() {
  const t = useTranslations('Home');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const handleSignOut = () => {
    signOut();
    handleCloseNavMenu();
  };

  const pages = [
    { label: t('signIn'), path: '/signin' },
    { label: t('signUp'), path: '/signup' },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const toggleLang = (selectedLang: 'ru' | 'en') => {
    if (selectedLang === locale) return;
    router.push(pathname, { locale: selectedLang });
  };
  interface ILanguageButton {
    languageToggle: 'ru' | 'en';
    languageName: 'RU' | 'EN';
  }

  function LanguageButton({ languageToggle, languageName }: ILanguageButton) {
    return (
      <Button
        variant={locale === languageToggle ? 'contained' : 'text'}
        color="inherit"
        onClick={() => toggleLang(languageToggle)}
        sx={{ color: locale === languageToggle ? 'white' : 'gray' }}
      >
        {languageName}
      </Button>
    );
  }

  return (
    <AppBar
      component="header"
      position="fixed"
      sx={{
        backgroundColor: '#3b3e41ff',
        top: 0,
        width: '100%',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" style={{ display: 'inline-flex' }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                width: 85,
                height: 85,
                cursor: 'pointer',
              }}
            />
          </Link>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              mr: 3,
              gap: 1,
            }}
          >
            <LanguageButton languageToggle={'ru'} languageName={'RU'} />
            <LanguageButton languageToggle={'en'} languageName={'EN'} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {!user ? (
                pages.map(({ label, path }) => (
                  <Link
                    key={label}
                    href={path}
                    style={{ textDecoration: 'none' }}
                    locale={locale}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography sx={{ textAlign: 'center' }}>
                        {label}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))
              ) : (
                <MenuItem onClick={handleSignOut}>
                  <Typography sx={{ textAlign: 'center' }}>
                    {t('signOut')}
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Link href="/" style={{ display: 'inline-flex' }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{
                display: { xs: 'flex', md: 'none' },
                mr: 2,
                width: 70,
                height: 70,
                cursor: 'pointer',
              }}
            />
          </Link>

          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              gap: 1,
              mr: 2,
            }}
          >
            <LanguageButton languageToggle={'ru'} languageName={'RU'} />
            <LanguageButton languageToggle={'en'} languageName={'EN'} />
          </Box>

          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3 }}
          >
            {!user ? (
              pages.map(({ label, path }) => (
                <Link
                  key={label}
                  href={path}
                  style={{ textDecoration: 'none' }}
                  locale={locale}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                      textTransform: 'none',
                    }}
                  >
                    {label}
                  </Button>
                </Link>
              ))
            ) : (
              <Button
                onClick={handleSignOut}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'none',
                }}
              >
                {t('signOut')}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
