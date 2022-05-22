import React, { useCallback, useReducer, useState } from 'react';
import { Descendant } from 'slate';
import { createTheme, ThemeProvider } from '@mui/material';
import { TemplateEditor } from './components/TemplateEditor';
import { initialVariableList } from './utils/VariableList';

import { initialValue } from './utils/initialDocument';

import './App.css';

import { variableReducer, initVariableReducer } from './hooks/VariableListReducer';
import { AddresseeGrid } from './components/AddresseeGrid';
import { TabContent } from './components/CustomTabs';

import { AppContainer, ContentContainer, } from './components/StyledComponents';
import { SerializedDocument } from './components/SerializedDocument';
import { SideMenu } from './components/SideMenu';
import { AppTheme, getTheme, initTheme, toggleTheme } from './utils/AppTheme';

function App() {
  const [themeMode, setThemeMode] = useState<AppTheme>(initTheme());

  const [documentValue, setDocumentValue] = useState<Descendant[]>(initialValue);

  const [variableReducerState, variableDispatch] = useReducer(
    variableReducer,
    initVariableReducer(initialVariableList, [])
  );

  const { variableList, addresseeList } = { ...variableReducerState };

  const [tabsValue, setTabsValue] = React.useState(0);

  const handleThemeSwitch = useCallback(
    () => {
      console.log("switch theme");

      setThemeMode(prevTheme => toggleTheme(prevTheme));
    },
    []
  );

  const handleTabsChange = useCallback((newValue: number) => {
    setTabsValue(newValue);
  }, []);

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <AppContainer>
        <SideMenu onTabChange={handleTabsChange} onThemeChange={handleThemeSwitch} tabsValue={tabsValue} />
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
                return <SerializedDocument nodes={documentValue} addressee={addressee} />;
              }}
            />
          </TabContent>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
