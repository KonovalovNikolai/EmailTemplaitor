import { renameAddresseeFieldInList } from "../../../utils/Addressee";
import { Variable, renameVariableInList } from "../../../utils/VariableList";
import { IFieldsReducerAction, FieldsReducerState } from "../types";


export class RenameFieldAction implements IFieldsReducerAction {
    private _field: Variable;
    private _newField: Variable;

    public constructor(field: Variable, newField: Variable) {
        this._field = field;
        this._newField = newField;
    }

    public Action(state: FieldsReducerState): FieldsReducerState {
        const { fieldList, addresseeList } = { ...state };
        const newFieldList = renameVariableInList(fieldList, this._field, this._newField);
        const newAddresseeList = renameAddresseeFieldInList(addresseeList, this._field, this._newField);

        return {
            fieldList: newFieldList,
            addresseeList: newAddresseeList
        };
    }
}
