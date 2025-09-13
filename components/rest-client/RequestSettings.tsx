import { Tab, Tabs, TextField } from '@mui/material';
import TabPanel from '../common/TabPanel';
import { ChangeEvent, memo, SyntheticEvent } from 'react';
import { useTranslations } from 'next-intl';

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}
interface RequestSettingsProps {
  currentTab: number;
  body?: string;
  onTabChange: (_event: SyntheticEvent, _newValue: number) => void;
  onBodyChange: (_event: ChangeEvent<HTMLInputElement>) => void;
}

const RequestSettings = memo(function RequestSettings({
  currentTab,
  body,
  onTabChange,
  onBodyChange,
}: RequestSettingsProps) {
  const t = useTranslations('RequestEditor');

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={onTabChange}
        aria-label="request params tabs"
      >
        <Tab label={t('query')} {...a11yProps(0)}></Tab>
        <Tab label={t('headers')} {...a11yProps(1)}></Tab>
        <Tab label={t('body')} {...a11yProps(2)}></Tab>
        <Tab label={t('codeSnippets')} {...a11yProps(3)}></Tab>
      </Tabs>
      <TabPanel value={currentTab} index={0}>
        Query Component
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        Headers Component
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <p>Body Component</p>
        <TextField
          id="body"
          value={body ?? ''}
          onChange={onBodyChange}
        ></TextField>
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        Code Component
      </TabPanel>
    </>
  );
});

export default RequestSettings;
