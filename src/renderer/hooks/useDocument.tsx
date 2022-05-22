import { useReducer, useState } from "react";
import { Addressee } from "renderer/utils/Addressee";
import { Variable } from "renderer/utils/VariableList";
import { Descendant } from "slate";
import { initVariableReducer, IVariablesReducerAction, variableReducer } from "./VariableListReducer";

export function useDocument(
  document: Descendant[],
  variables: Variable[],
  addressees: Addressee[]
) : [Descendant[], React.Dispatch<React.SetStateAction<Descendant[]>>, Variable[], Addressee[], React.Dispatch<IVariablesReducerAction>] {
  const [documentValue, setDocumentValue] = useState<Descendant[]>(document);

  const [variableReducerState, variableDispatch] = useReducer(
    variableReducer,
    initVariableReducer(variables, addressees)
  );

  return [documentValue, setDocumentValue, variableReducerState.variableList, variableReducerState.addresseeList, variableDispatch];
}
