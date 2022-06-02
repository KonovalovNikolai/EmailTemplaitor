import { ThemeProvider } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { SaveDocumentAction, SetEditorDocumentAction } from "renderer/hooks/DocumentReducer";
import { useDocument } from "renderer/hooks/useDocument";
import { Addressee } from "renderer/utils/Addressee";
import { AppTheme, getTheme, initTheme, toggleTheme } from "renderer/utils/AppTheme";
import EditorDocument from "renderer/utils/EditorDocument";
import { initDocument, JsonToDocument } from "renderer/utils/FileControl";
import { serializeNodeToHTML } from "renderer/utils/serializeToHTML";
import { AddresseeGrid } from "./AddresseeGrid";
import { resetNodes } from "./CustomSlateEditor";
import { TabContent } from "./CustomTabs";
import { SerializedDocument } from "./SerializedDocument";
import { SideMenu } from "./SideMenu";
import { StatusSnackbar, useStatusSnackbar } from "./StatusSnackbar";
import { AppContainer, ContentContainer } from "./StyledComponents";
import { TemplateEditor } from "./TemplateEditor";

export const EmailTemplater = () => {
  const [themeMode, setThemeMode] = useState<AppTheme>(initTheme());
  const [tabsValue, setTabsValue] = React.useState(0);

  const [
    documentValue,
    variableList,
    addresseeList,
    upToDateStatus,
    editor,
    documentDispatch
  ] = useDocument(...initDocument());

  const [snackbarState, setSnackbarState, closeSnackbar] = useStatusSnackbar();

  const saveCallback = useCallback(
    async (resultPromise: Promise<string>) => {
      setSnackbarState("info", "Сохраняю...");

      const resultMessage = await resultPromise;

      if (resultMessage === "success") {
        setSnackbarState("success", "Успешно сохранено!");
        return;
      }

      if (resultMessage === "error") {
        setSnackbarState("error", "Ошибка!");
        return;
      }

      closeSnackbar();
    }, []
  );

  const handleSave = useCallback(
    () => {
      const action = new SaveDocumentAction(saveCallback);
      documentDispatch(action);
    }, []
  );

  const handleOpenDocument = useCallback(
    async () => {
      setSnackbarState("info", "Открываю...");

      const result = await window.electron.ipcRenderer.openDocument();

      if (result.status === "canceled") {
        closeSnackbar();
        return;
      }

      if (result.status === "error") {
        setSnackbarState("error", "Ошибка!");
        return;
      }

      let document: EditorDocument;

      try {
        document = JsonToDocument(result.JSONDocument);
      } catch (error) {
        setSnackbarState("error", "Ошибка!");
        return;
      }

      const action = new SetEditorDocumentAction(document);
      documentDispatch(action);

      setSnackbarState("success", "Успешно!");
    },
    []
  );

  const handleThemeSwitch = useCallback(() => setThemeMode(prevTheme => toggleTheme(prevTheme)), []);
  const handleTabsChange = useCallback((newValue: number) => setTabsValue(newValue), []);

  const handlePreview = useCallback(
    (addressee: Addressee) => { return <SerializedDocument nodes={documentValue} addressee={addressee} />; }, [documentValue]
  );

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <AppContainer>
        <SideMenu
          onSave={handleSave}
          onOpen={handleOpenDocument}
          onTabChange={handleTabsChange}
          onThemeChange={handleThemeSwitch}
          tabsValue={tabsValue}
          upToDateStatus={upToDateStatus}
        />
        <ContentContainer>
          <TabContent index={0} value={tabsValue}>
            <TemplateEditor
              editor={editor}
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
              onPreview={handlePreview}
            />
          </TabContent>
        </ContentContainer>
      </AppContainer>
      <StatusSnackbar state={snackbarState} onClose={closeSnackbar} />
    </ThemeProvider>
  );
};
