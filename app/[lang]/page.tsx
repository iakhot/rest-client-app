import { Box } from '@mui/material';
import CentralArea from '@/components/main-page/CentralArea';

export default function Home() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CentralArea />
    </Box>
  );
}
