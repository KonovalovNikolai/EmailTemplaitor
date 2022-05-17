import { addAddresseeFieldToList } from "../../../utils/Addressee";
import { Variable } from "../../../utils/VariableList";
import { IFieldsReducerAction, FieldsReducerState } from "../types";


export class AddFieldAction implements IFieldsReducerAction {
    private _newField: Variable;

    public constructor(newField: Variable) {
        this._newField = newField;
    }
    public Action(state: FieldsReducerState): FieldsReducerState {
        const { fieldList, addresseeList } = { ...state };
        fieldList.push(this._newField);
        const newAddresseeList = addAddresseeFieldToList(addresseeList, this._newField);

        return {
            fieldList: [...fieldList],
            addresseeList: newAddresseeList
        };
    }
}
