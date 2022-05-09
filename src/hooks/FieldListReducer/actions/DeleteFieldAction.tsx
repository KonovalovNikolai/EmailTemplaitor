import { removeAddresseeFieldFromList } from "../../../utils/Addressee";
import { Field, removeFieldFromList } from "../../../utils/FieldList";
import { FieldsReducerState, IFieldsReducerAction } from "../types";

export class DeleteFieldAction implements IFieldsReducerAction {
    private _field: Field;

    public constructor(field: Field) {
        this._field = field;
    }

    public Action(state: FieldsReducerState): FieldsReducerState {
        const { fieldList, addresseeList } = { ...state };
        const newFieldList = removeFieldFromList(fieldList, this._field);
        const newAddresseeList = removeAddresseeFieldFromList(addresseeList, this._field);

        return {
            fieldList: newFieldList,
            addresseeList: newAddresseeList,
        };
    }
}
