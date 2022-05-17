import { removeAddresseeFieldFromList } from "../../../utils/Addressee";
import { Variable, removeVariableFromList } from "../../../utils/VariableList";
import { FieldsReducerState, IFieldsReducerAction } from "../types";

export class DeleteFieldAction implements IFieldsReducerAction {
    private _field: Variable;

    public constructor(field: Variable) {
        this._field = field;
    }

    public Action(state: FieldsReducerState): FieldsReducerState {
        const { fieldList, addresseeList } = { ...state };
        const newFieldList = removeVariableFromList(fieldList, this._field);
        const newAddresseeList = removeAddresseeFieldFromList(addresseeList, this._field);

        return {
            fieldList: newFieldList,
            addresseeList: newAddresseeList,
        };
    }
}
