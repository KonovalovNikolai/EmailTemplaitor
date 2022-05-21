import React, { useCallback, useReducer, useState } from 'react';
import { Descendant } from 'slate';
import EditIcon from '@mui/icons-material/Edit';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material';
import { TemplateEditor } from './components/TemplateEditor';
import { initialVariableList } from './utils/VariableList';

import { initialValue } from './utils/initialDocument';

import './App.css';

import {
  variableReducer,
  initVariableReducer,
} from './hooks/VariableListReducer';
import { AddresseeGrid } from './components/AddresseeGrid';
import { TabButton, TabContent } from './components/CustomTabs';

import theme from './utils/AppTheme';
import {
  AppContainer,
  ContentContainer,
  TabButtonsContainer,
} from './components/StyledComponents';
import { SerializedDocument } from './components/SerializedDocument';

function App() {
  const [documentValue, setDocumentValue] =
    useState<Descendant[]>(initialValue);

  const [variableReducerState, variableDispatch] = useReducer(
    variableReducer,
    initVariableReducer(initialVariableList, [])
  );

  const { variableList, addresseeList } = { ...variableReducerState };

  const [tabsValue, setTabsValue] = React.useState(0);

  const handleTabsChange = (newValue: number) => {
    setTabsValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
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
            <TemplateEditor
              value={documentValue}
              variableList={variableList}
              onDocumentChange={setDocumentValue}
              onVariableListChange={variableDispatch}
            />
          </TabContent>
          <TabContent index={1} value={tabsValue}>
            <AddresseeGrid
              variableList={variableList}
              addresseeList={addresseeList}
              onChange={variableDispatch}
              onPreview={(addressee) => {
                return (
                  <SerializedDocument
                    nodes={documentValue}
                    addressee={addressee}
                  />
                );
              }}
            />
          </TabContent>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
