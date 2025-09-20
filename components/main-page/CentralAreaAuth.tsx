import { Typography, Container } from '@mui/material';
import { useTranslations } from 'next-intl';

interface ICentralAreaAuth {
  email: string | null | undefined;
}

function CentralAreaAuth({ email }: ICentralAreaAuth) {
  const t = useTranslations('Home');

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: { xs: 4, sm: 8 },
        textAlign: 'center',
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
        {t('welcomeBack')}
        {email}
        {'\u00A0'}!
      </Typography>
    </Container>
  );
}

export default CentralAreaAuth;
