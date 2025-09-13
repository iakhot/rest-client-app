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
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default TabPanel;
