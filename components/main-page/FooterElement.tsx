import React from 'react';
import NextLink from 'next/link';
import { Box, Typography, Link, Stack } from '@mui/material';
import GetLink from '../common/GetLink';
function FooterElement() {
  return (
    <Stack
      component="footer"
      maxWidth="lg"
      pt={2}
      direction={{ sm: 'column', md: 'row' }}
      justifyContent={'center'}
      gap={{ sm: 1, md: 3 }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={'center'}
        alignItems={'center'}
        gap={1}
      >
        <GetLink
          link={'https://github.com/Locust13region'}
          name={'Locust13region'}
          newTab={true}
        />

        <GetLink
          link={'https://github.com/iakhot'}
          name={'iakhot'}
          newTab={true}
        />

        <GetLink
          link={'https://github.com/Dedal88'}
          name={'Dedal88'}
          newTab={true}
        />
      </Stack>
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={1}
      >
        <Typography variant="body2" color="text.primary">
          © 2025
        </Typography>

        <Link
          component={NextLink}
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            mt: { xs: 1, sm: 0 },
            '& img': {
              width: { xs: 45, sm: 65 },
              height: { xs: 38, sm: 55 },
            },
          }}
        >
          <Box component="img" src="/logo-rs.svg" alt="Logo RS School" />
        </Link>
      </Stack>
    </Stack>
  );
}

export default FooterElement;
