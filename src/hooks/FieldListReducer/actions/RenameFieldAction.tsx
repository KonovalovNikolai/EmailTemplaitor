import { renameAddresseeFieldInList } from "../../../utils/Addressee";
import { Field, renameFieldInList } from "../../../utils/FieldList";
import { IFieldsReducerAction, FieldsReducerState } from "../types";


export class RenameFieldAction implements IFieldsReducerAction {
    private _field: Field;
    private _newField: Field;

    public constructor(field: Field, newField: Field) {
        this._field = field;
        this._newField = newField;
    }

    public Action(state: FieldsReducerState): FieldsReducerState {
        const { fieldList, addresseeList } = { ...state };
        const newFieldList = renameFieldInList(fieldList, this._field, this._newField);
        const newAddresseeList = renameAddresseeFieldInList(addresseeList, this._field, this._newField);

        return {
            fieldList: newFieldList,
            addresseeList: newAddresseeList
        };
    }
}
