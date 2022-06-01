import { Variable } from "../../utils/VariableList";
import { Addressee } from "../../utils/Addressee";
import { Descendant } from "slate";

export interface DocumentReducerState {
    document: Descendant[];
    variableList: Variable[];
    addresseeList: Addressee[];
    upToDateStatus: boolean;
}

export interface IDocumentReducerAction {
    Action(state: DocumentReducerState): DocumentReducerState;
}
