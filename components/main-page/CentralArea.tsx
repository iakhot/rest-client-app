import { Box, Button, Typography, Container } from '@mui/material';
import { useTranslations } from 'next-intl';

function CentralArea() {
  const t = useTranslations('Home');

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: { xs: 4, sm: 8 },
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', sm: '3rem' },
          fontWeight: 700,
        }}
      >
        {t('welcome')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          gap: 2,
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          href="/signin"
          size="large"
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          {t('signIn')}
        </Button>

        <Button
          variant="outlined"
          color="primary"
          href="/signup"
          size="large"
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          {t('signUp')}
        </Button>
      </Box>
    </Container>
  );
}

export default CentralArea;
