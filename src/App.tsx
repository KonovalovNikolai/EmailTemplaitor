import React, { useState } from 'react';
import { Descendant } from 'slate';
import { FieldList } from './components/EditableList/utils/FieldList';
import CustomEditor from './components/Editor/CustomEditor';

import { Box, Tab, Tabs, Typography } from '@mui/material';
import { initialValue } from './components/Editor/utils/initialDocument';

import EditIcon from '@mui/icons-material/Edit';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SendIcon from '@mui/icons-material/Send';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      sx={{
        height: "-webkit-fill-available",
      }}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            height: "-webkit-fill-available",
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function App() {
  const [documentValue, setDocumentValue] = useState<Descendant[]>(initialValue);
  const [list, setList] = useState<FieldList>(new FieldList([
    {
      name: "City",
      isDeletable: true
    },
    {
      name: "Name",
      isDeletable: true
    },
    {
      name: "LastName",
      isDeletable: true
    },
    {
      name: "Phone",
      isDeletable: true
    },
    {
      name: "1",
      isDeletable: true
    },
    {
      name: "2",
      isDeletable: true
    },
    {
      name: "3",
      isDeletable: true
    },
    {
      name: "4",
      isDeletable: true
    },
    {
      name: "5",
      isDeletable: true
    },
    {
      name: "7",
      isDeletable: true
    },
    {
      name: "8",
      isDeletable: true
    },
  ]));

  const [tabsValue, setTabsValue] = React.useState(0);

  const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        width: "800px",
        height: "400px",
        m: "20px auto",
        p: "20px",
      }}
    >
      <Tabs
        orientation="vertical"
        value={tabsValue}
        onChange={handleTabsChange}
        aria-label="Vertical tabs example"
        sx={{
          flex: "none",
          borderRight: 1,
          borderColor: 'divider'
        }}
      >
        <Tab icon={<EditIcon />} {...a11yProps(0)} />
        <Tab icon={<PeopleAltIcon />} {...a11yProps(1)} />
        <Tab icon={<SendIcon />} {...a11yProps(2)} />
      </Tabs>
      <Box
        sx={{
          padding: "10px 5px",
          flex: "auto",
          backgroundColor: "white",
        }}
      >
        <TabPanel value={tabsValue} index={0}>
          <CustomEditor
            value={documentValue}
            list={list}
            onChange={setDocumentValue}
            onListChange={setList}
          />
        </TabPanel>
        <TabPanel value={tabsValue} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={tabsValue} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Box>
  );
}

export default App;
