import { useReducer } from "react";
import { Addressee } from "renderer/utils/Addressee";
import EditorDocument from "renderer/utils/EditorDocument";
import { Variable } from "renderer/utils/VariableList";
import { Descendant } from "slate";
import { documentReducer, IDocumentReducerAction, initDocumentReducer } from "./DocumentReducer";

export function useDocument(
  document: Descendant[],
  variables: Variable[],
  addressees: Addressee[],
) : [...EditorDocument, boolean, React.Dispatch<IDocumentReducerAction>] {

  const [documentReducerState, documentDispatch] = useReducer(
    documentReducer,
    initDocumentReducer(document, variables, addressees)
  );

  return [
    documentReducerState.document,
    documentReducerState.variableList,
    documentReducerState.addresseeList,
    documentReducerState.upToDateStatus,
    documentDispatch
  ];
}
