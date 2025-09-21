import { Tab, Tabs } from '@mui/material';
import TabPanel from '../common/TabPanel';
import { memo, SyntheticEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { a11yTabProps } from '@/service/tabsUtils';
import { useClientStore } from '@/store/clientStore';
import KeyValueEditor from './KeyValueEditor';
import ResponseView from './ResponseView';

interface RequestSettingsProps {
  initialBody?: string;
  onBodyChange: (_value: string) => void;
}

const RequestSettings = memo(function RequestSettings({
  initialBody,
  onBodyChange,
}: RequestSettingsProps) {
  const t = useTranslations('RequestEditor');
  const setStoreTab = useClientStore((state) => state.setTab);
  const storeTab = useClientStore((state) => state.currentTab);
  const [currentTab, setCurrentTab] = useState(storeTab);
  const [body, setBody] = useState(initialBody);

  const handleTabChange = (event: SyntheticEvent, value: number) => {
    event.preventDefault();
    setStoreTab(value);
    setCurrentTab(value);
  };

  const TabPanelSx = {
    height: '255px',
    overflowY: 'auto',
  };

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="request params tabs"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label={t('headers')} {...a11yTabProps(0)}></Tab>
        <Tab label={t('body')} {...a11yTabProps(1)}></Tab>
        <Tab label={t('codeSnippets')} {...a11yTabProps(2)}></Tab>
      </Tabs>
      <TabPanel value={currentTab} index={0} sx={TabPanelSx}>
        <KeyValueEditor />
      </TabPanel>
      <TabPanel value={currentTab} index={1} sx={TabPanelSx}>
        <ResponseView
          body={body}
          bodyChange={onBodyChange}
          setBodyReq={setBody}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={2} sx={TabPanelSx}>
        <p>Code Component</p>
      </TabPanel>
    </>
  );
});

export default RequestSettings;
