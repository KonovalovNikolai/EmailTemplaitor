import { Addressee } from "../utils/Addressee";
import { Field } from "../utils/FieldList";


export interface FieldsReducerState {
    fieldList: Field[];
    addresseeList: Addressee[];
};

export interface IFieldsReducerAction {
    Action(state: FieldsReducerState): FieldsReducerState;
}
