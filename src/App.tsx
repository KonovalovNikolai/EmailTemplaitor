import React, { useReducer, useState } from 'react';
import { Descendant } from 'slate';
import { CustomEditor } from "./components/Editor";
import { initialFieldList } from './utils/FieldList';

import { initialValue } from './utils/initialDocument';

import EditIcon from '@mui/icons-material/Edit';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SendIcon from '@mui/icons-material/Send';

import { fieldsReducer, initFieldReducer } from './hooks/FieldListReducer';
import { AddresseeGrid } from './components/AddresseeGrid';
import { TabButton, TabContent } from './components/CustomTabs';
import { createTheme, ThemeProvider } from '@mui/material';

import theme from './utils/Theme';
import { AppContainer, ContentContainer, TabButtonsContainer } from './components/StyledComponents';

function App() {
  const [documentValue, setDocumentValue] = useState<Descendant[]>(initialValue);

  const [fieldReducerState, fieldDispatch] = useReducer(
    fieldsReducer,
    initFieldReducer(initialFieldList, [])
  );

  const { fieldList, addresseeList } = { ...fieldReducerState };

  const [tabsValue, setTabsValue] = React.useState(0);

  const handleTabsChange = (newValue: number) => {
    setTabsValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer
        sx={{
          m: "20px auto",
        }}
      >
        <TabButtonsContainer>
          <TabButton
            index={0}
            value={tabsValue}
            icon={<EditIcon sx={{ fontSize: 30 }} />}
            onChange={handleTabsChange}
          />
          <TabButton
            index={1}
            value={tabsValue}
            icon={<PeopleAltIcon sx={{ fontSize: 30 }} />}
            onChange={handleTabsChange}
          />
          <TabButton
            index={2}
            value={tabsValue}
            icon={<SendIcon sx={{ fontSize: 30 }} />}
            onChange={handleTabsChange}
          />
        </TabButtonsContainer>
        <ContentContainer>
          <TabContent index={0} value={tabsValue}>
            <CustomEditor
              value={documentValue}
              fieldList={fieldList}
              onDocumentChange={setDocumentValue}
              onFieldListChange={fieldDispatch}
            />
          </TabContent>
          <TabContent index={1} value={tabsValue}>
            <AddresseeGrid
              fieldList={fieldList}
              addresseeList={addresseeList}
              onChange={fieldDispatch}
            />
          </TabContent>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
