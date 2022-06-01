import { Descendant } from "slate";
import { Addressee } from "../../utils/Addressee";
import { Variable } from "../../utils/VariableList";
import { DocumentReducerState, IDocumentReducerAction } from "./types";

export function initDocumentReducer(document: Descendant[], variableList: Variable[], addresseeList: Addressee[]): DocumentReducerState {
    return {
        document: document,
        variableList: variableList,
        addresseeList: addresseeList,
        upToDateStatus: false
    };
}

export function documentReducer(state: DocumentReducerState, action: IDocumentReducerAction) {
    if (!action) {
        return state;
    }

    return action.Action(state);
}
