import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

interface TabPanelProps {
  index: number;
  value: number;
}

interface RestProps {
  [key: string]: unknown;
}

function TabPanel(props: PropsWithChildren<TabPanelProps> & RestProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Box>
  );
}

export default TabPanel;
