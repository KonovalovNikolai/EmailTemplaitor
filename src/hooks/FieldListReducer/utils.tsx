import { Addressee } from "../../utils/Addressee";
import { Variable } from "../../utils/VariableList";
import { FieldsReducerState, IFieldsReducerAction } from "./types";

export function initFieldReducer(fieldList: Variable[], addresseeList: Addressee[]) {
    return {
        fieldList: fieldList,
        addresseeList: addresseeList,
    } as FieldsReducerState;
}

export function fieldsReducer(state: FieldsReducerState, action: IFieldsReducerAction) {
    if (!action) {
        return;
    }

    return action.Action(state);
}