import React from 'react';
import { Typography, Box, TextField, Button, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { MessageContext } from '@/components/common/MessageContextProvider';
import { useContext } from 'react';

interface IResponseViewProps {
  statusResp?: number | undefined;
  body?: string | undefined;
  bodyChange?: (_value: string) => void;
  setBodyReq?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function ResponseView({
  statusResp,
  body,
  bodyChange,
  setBodyReq,
}: IResponseViewProps) {
  const t = useTranslations('Response');
  const { addSnackMessage } = useContext(MessageContext);

  let total;

  const handleFormat = () => {
    if (!body || body.trim() === '') return;
    try {
      const parsed = JSON.parse(body);
      const formatted = JSON.stringify(parsed, null, 2);
      setBodyReq?.(formatted);
      bodyChange?.(formatted);
    } catch (error) {
      addSnackMessage({
        text: `Invalid JSON:  ${(error as Error).message}`,
        messageType: 'error',
      });
    }
  };

  const formattedResponse = body
    ? (() => {
        try {
          const parsed = JSON.parse(body);
          return JSON.stringify(parsed, null, 2);
        } catch {
          return body;
        }
      })()
    : 'No body available.';

  const responseBody = (
    <Stack
      alignItems="flex-start"
      sx={{
        marginRight: { xs: '5%', sm: '10%', md: '18%' },
        marginLeft: { xs: '5%', md: '3%' },
      }}
    >
      <Box
        sx={{
          color: '#b6d3ebff',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.5rem' },
            }}
          >
            {t('resp')}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.5rem' },
            }}
          >
            {t('status')}: {statusResp}
          </Typography>
        </Box>
      </Box>
      <TextField
        multiline
        disabled
        value={formattedResponse}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputBase-input': {
            color: '#ffffffff',
            '&.Mui-disabled': {
              color: '#e0e0e0',
              WebkitTextFillColor: '#e0e0e0',
              opacity: 1,
            },
            whiteSpace: 'pre-wrap',
          },
          border: '1px solid #b6d3ebff',
          backgroundColor: '#474343ff',
          height: { xs: '45vh', sm: '30vh', md: '30vh' },
          overflow: 'auto',
          fontSize: { xs: '0.8rem', md: '1rem' },
          width: { xs: '70%', sm: '80%', md: '100%' },
        }}
      />
    </Stack>
  );

  const requestBody = (
    <Stack alignItems="flex-start">
      <Button
        variant="contained"
        onClick={handleFormat}
        sx={{
          marginLeft: '2%',
        }}
      >
        {t('button')}
      </Button>

      <TextField
        multiline
        minRows={4}
        maxRows={4}
        sx={{
          width: '80%',
          whiteSpace: 'pre-wrap',
          padding: { xs: '8px', md: '10px' },
          height: { xs: '40%', sm: '30%', md: '20%' },
          overflow: 'auto',
          fontSize: { xs: '0.8rem', md: '1rem' },
        }}
        value={body ?? ''}
        onChange={(e) => setBodyReq?.(e.target.value)}
        onBlur={() => {
          bodyChange?.(body ?? '');
        }}
      ></TextField>
    </Stack>
  );

  if (statusResp && body) {
    total = responseBody;
  } else if (bodyChange && setBodyReq) {
    total = requestBody;
  }
  return total;
}

export default ResponseView;
