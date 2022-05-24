import { useCallback, useReducer } from "react";
import { Addressee } from "renderer/utils/Addressee";
import EditorDocument from "renderer/utils/EditorDocument";
import { Variable } from "renderer/utils/VariableList";
import { Descendant } from "slate";
import { documentReducer, DocumentReducerState, IDocumentReducerAction, initDocumentReducer } from "./DocumentReducer";

export function useDocument(
  document: Descendant[],
  variables: Variable[],
  addressees: Addressee[],
  onUpdate: () => void,
) : [...EditorDocument, React.Dispatch<IDocumentReducerAction>] {

  const reducer = useCallback(
    (state: DocumentReducerState, action: IDocumentReducerAction) => {
      onUpdate();
      return documentReducer(state, action);
    },
    []
  )

  const [documentReducerState, documentDispatch] = useReducer(
    reducer,
    initDocumentReducer(document, variables, addressees)
  );

  return [
    documentReducerState.document,
    documentReducerState.variableList,
    documentReducerState.addresseeList,
    documentDispatch
  ];
}
