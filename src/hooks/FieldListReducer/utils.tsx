import { Addressee } from "../../utils/Addressee";
import { Field } from "../../utils/FieldList";
import { FieldsReducerState, IFieldsReducerAction } from "./types";

export function initFieldReducer(fieldList: Field[], addresseeList: Addressee[]) {
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