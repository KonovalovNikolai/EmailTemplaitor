import { ThemeProvider } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { useDocument } from "renderer/hooks/useDocument";
import { AppTheme, getTheme, initTheme, toggleTheme } from "renderer/utils/AppTheme";
import { documentToJson, initDocument, selectSavePath } from "renderer/utils/FileControl";
import { AddresseeGrid } from "./AddresseeGrid";
import { TabContent } from "./CustomTabs";
import { SerializedDocument } from "./SerializedDocument";
import { SideMenu } from "./SideMenu";
import { AppContainer, ContentContainer } from "./StyledComponents";
import { TemplateEditor } from "./TemplateEditor";

export const EmailTemplater = () => {
  const [themeMode, setThemeMode] = useState<AppTheme>(initTheme());
  const [tabsValue, setTabsValue] = React.useState(0);
  const [
    documentValue,
    variableList,
    addresseeList,
    documentDispatch
  ] = useDocument(...initDocument());

  const handleSave = useCallback(
    () => {
      selectSavePath();
      documentToJson(documentValue, variableList, addresseeList);
    },
    [documentValue, variableList, addresseeList]
  );
  const handleThemeSwitch = useCallback(() => setThemeMode(prevTheme => toggleTheme(prevTheme)), []);
  const handleTabsChange = useCallback((newValue: number) => setTabsValue(newValue), []);

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <AppContainer>
        <SideMenu
          onTabChange={handleTabsChange}
          onSave={handleSave}
          onThemeChange={handleThemeSwitch}
          tabsValue={tabsValue}
        />
        <ContentContainer>
          <TabContent index={0} value={tabsValue}>
            <TemplateEditor
              value={documentValue}
              variableList={variableList}
              onDocumentChange={documentDispatch}
            />
          </TabContent>
          <TabContent index={1} value={tabsValue}>
            <AddresseeGrid
              variableList={variableList}
              addresseeList={addresseeList}
              onChange={documentDispatch}
              onPreview={(addressee) => {
                return <SerializedDocument nodes={documentValue} addressee={addressee} />;
              }}
            />
          </TabContent>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
};
