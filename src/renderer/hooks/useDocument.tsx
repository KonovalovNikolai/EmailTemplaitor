import { useMemo, useReducer } from "react";
import { withVariable } from "renderer/components/CustomSlateEditor/plugins/withVariables";
import { Addressee } from "renderer/utils/Addressee";
import EditorDocument from "renderer/utils/EditorDocument";
import { Variable } from "renderer/utils/VariableList";
import { createEditor, Descendant, Editor } from "slate";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { documentReducer, IDocumentReducerAction, initDocumentReducer } from "./DocumentReducer";

export function useDocument(
  document: Descendant[],
  variables: Variable[],
  addressees: Addressee[],
): [...EditorDocument, boolean, Editor, React.Dispatch<IDocumentReducerAction>] {
  // Инициализация редактора
  const editor = useMemo(() => withVariable(withReact(withHistory(createEditor()))), []);

  const [documentReducerState, documentDispatch] = useReducer(
    documentReducer,
    initDocumentReducer(document, variables, addressees, editor)
  );

  return [
    documentReducerState.document,
    documentReducerState.variableList,
    documentReducerState.addresseeList,
    documentReducerState.upToDateStatus,
    editor,
    documentDispatch
  ];
}
