import { Card, SignContainer } from '@/style/styledSign';
import { useTranslations } from 'next-intl';
import { FC, FormEventHandler, Dispatch, SetStateAction } from 'react';
import GetLink from '@/components/common/GetLink';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';

type SignFormProps = {
  formType: 'signUp' | 'signIn';
  required?: boolean;
  userFormData?: { email: string; password: string };
  setFormData?: Dispatch<SetStateAction<{ email: string; password: string }>>;
  handleSubmit: FormEventHandler;
  errors?:
    | {
        email?: string[] | undefined;
        password?: string[] | undefined;
      }
    | undefined;
};

const SignForm: FC<SignFormProps> = ({
  formType,
  required = false,
  userFormData,
  setFormData,
  handleSubmit,
  errors,
}) => {
  const t = useTranslations('Sign');

  return (
    <SignContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: '100%',
            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
          }}
        >
          {t(formType)}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="email">{t('email')} </FormLabel>
            <TextField
              required={required}
              fullWidth
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              variant="outlined"
              value={userFormData?.email}
              onChange={(e) =>
                setFormData?.((prev) => ({ ...prev, email: e.target.value }))
              }
              error={errors?.email?.length ? true : false}
              helperText={errors?.email?.join(', ')}
              color={(errors?.email?.length ?? 0) ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">{t('password')} </FormLabel>
            <TextField
              required={required}
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              value={userFormData?.password}
              onChange={(e) =>
                setFormData?.((prev) => ({ ...prev, password: e.target.value }))
              }
              error={errors?.password?.length ? true : false}
              helperText={errors?.password?.join(', ')}
              color={(errors?.password?.length ?? 0) ? 'error' : 'primary'}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!!errors}
          >
            {t(formType)}
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: 'text.secondary' }}>{t('or')} </Typography>
        </Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>
            {t(formType === 'signUp' ? 'alreadyHave' : 'noAccount ')}
            {'  '}
            <GetLink
              link={formType === 'signUp' ? '/signin' : '/signup'}
              name={t(formType === 'signUp' ? 'signIn' : 'signUp')}
            />
          </Typography>
        </Box>
      </Card>
    </SignContainer>
  );
};

export default SignForm;
