import { ThemeProvider } from "@emotion/react";
import { Alert, Snackbar } from "@mui/material";
import React, { useCallback, useState } from "react";
import { SaveDocumentAction } from "renderer/hooks/DocumentReducer";
import { useDocument } from "renderer/hooks/useDocument";
import { AppTheme, getTheme, initTheme, toggleTheme } from "renderer/utils/AppTheme";
import { initDocument } from "renderer/utils/FileControl";
import { AddresseeGrid } from "./AddresseeGrid";
import { TabContent } from "./CustomTabs";
import { SerializedDocument } from "./SerializedDocument";
import { SideMenu } from "./SideMenu";
import { AppContainer, ContentContainer } from "./StyledComponents";
import { TemplateEditor } from "./TemplateEditor";

interface SnackbarState {
  open: boolean;
  message: string;
  variant: "success" | "info" | "error";
}

export const EmailTemplater = () => {
  const [themeMode, setThemeMode] = useState<AppTheme>(initTheme());
  const [upToDateStatus, setUpToDateStatus] = useState(false);

  const handleDocumentUpdate = useCallback(() => setUpToDateStatus(false), []);

  const [tabsValue, setTabsValue] = React.useState(0);
  const [
    documentValue,
    variableList,
    addresseeList,
    documentDispatch
  ] = useDocument(...initDocument(), handleDocumentUpdate);

  const [snackState, setSnackOpen] = React.useState<SnackbarState>({
    open: false,
    message: "",
    variant: undefined,
  });

  const handleSnackClose = () => {
    setSnackOpen(prev => {
      return {
        ...prev,
        open: false,
      };
    });
  };

  const handleSave = useCallback(
    () => {
      const action = new SaveDocumentAction(
        async (resultPromise) => {
          setSnackOpen({
            open: true,
            message: "Сохраняю...",
            variant: "info",
          });

          const resultMessage = await resultPromise;

          if (resultMessage === "success") {
            setUpToDateStatus(true);
            setSnackOpen({
              open: true,
              message: "Успешно сохранено!",
              variant: "success",
            });
          }
          else if (resultMessage === "error") {
            setSnackOpen({
              open: true,
              message: "Ошибка!",
              variant: "error",
            });
          }
          else {
            setSnackOpen(prev => {
              return {
                ...prev,
                open: false,
              };
            });
          }
        }
      );
      documentDispatch(action);
    },
    []
  );

  const handleThemeSwitch = useCallback(() => setThemeMode(prevTheme => toggleTheme(prevTheme)), []);
  const handleTabsChange = useCallback((newValue: number) => setTabsValue(newValue), []);


  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <AppContainer>
        <SideMenu
          onSave={handleSave}
          onTabChange={handleTabsChange}
          onThemeChange={handleThemeSwitch}
          tabsValue={tabsValue}
          upToDateStatus={upToDateStatus}
        />
        <ContentContainer>
          <TabContent index={0} value={tabsValue}>
            <TemplateEditor
              documentValue={documentValue}
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
      <Snackbar
        key={snackState.variant}
        open={snackState.open}
        autoHideDuration={2000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackState.variant}>{snackState.message}</Alert>
      </Snackbar>
    </ThemeProvider>
  );
};
