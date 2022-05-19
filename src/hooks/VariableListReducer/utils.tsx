import { Addressee } from "../../utils/Addressee";
import { Variable } from "../../utils/VariableList";
import { VariablesReducerState, IVariablesReducerAction } from "./types";

export function initVariableReducer(variableList: Variable[], addresseeList: Addressee[]) {
    return {
        variableList: variableList,
        addresseeList: addresseeList,
    } as VariablesReducerState;
}

export function variableReducer(state: VariablesReducerState, action: IVariablesReducerAction) {
    if (!action) {
        return;
    }

    return action.Action(state);
}