import { ThemeProvider } from "@emotion/react";
import { Alert, Snackbar } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { SaveDocumentAction, SetEditorDocumentAction } from "renderer/hooks/DocumentReducer";
import { useDocument } from "renderer/hooks/useDocument";
import { AppTheme, getTheme, initTheme, toggleTheme } from "renderer/utils/AppTheme";
import EditorDocument from "renderer/utils/EditorDocument";
import { initDocument, JsonToDocument } from "renderer/utils/FileControl";
import { createEditor, Editor, Point, Transforms, Node } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { AddresseeGrid } from "./AddresseeGrid";
import { withVariable } from "./CustomSlateEditor/plugins/withVariables";
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

  // Инициализация редактора
  const editor = useMemo(
    () => withVariable(withReact(withHistory(createEditor()))),
    []
  );

  console.log(editor);

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

  const handleOpenDocument = useCallback(
    async () => {
      setSnackOpen({
        message: "Открываю...",
        variant: "info",
        open: true,
      });

      const result = await window.electron.ipcRenderer.openDocument();

      if (result.status === "canceled") {
        setSnackOpen(prev => {
          return {
            ...prev,
            open: false,
          };
        });
        return;
      }

      else if (result.status === "error") {
        setSnackOpen({
          open: true,
          message: "Ошибка!",
          variant: "error",
        });
        return;
      }

      let document: EditorDocument;

      try {
        document = JsonToDocument(result.JSONDocument);
      } catch (error) {
        setSnackOpen({
          open: true,
          message: "Ошибка!",
          variant: "error",
        });
        return;
      }

      const action = new SetEditorDocumentAction(document);
      documentDispatch(action);
      setUpToDateStatus(true);

      resetNodes(editor,
        {nodes: document[0]}
      ),

      editor.history = {
        redos: [],
        undos: [],
      };

      setSnackOpen({
        open: true,
        message: "Успешно!",
        variant: "success",
      });
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
              onPreview={(addressee) => {
                return <SerializedDocument nodes={documentValue} addressee={addressee} />;
              }}
            />
          </TabContent>
        </ContentContainer>
      </AppContainer>
      <Snackbar
        key={snackState.message}
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

function resetNodes<T extends Node>(
  editor: Editor,
  options: {  nodes?: Node | Node[],  at?: Location } = {}
): void {
  const children = [...editor.children]

  children.forEach((node) => editor.apply({ type: 'remove_node', path: [0], node }))

  if (options.nodes) {
    const nodes = Node.isNode(options.nodes) ? [options.nodes] : options.nodes

    nodes.forEach((node, i) => editor.apply({ type: 'insert_node', path: [i], node: node }))
  }

  const point = options.at && Point.isPoint(options.at)
    ? options.at
    : Editor.end(editor, [])

  if (point) {
    Transforms.select(editor, point)
  }
}
