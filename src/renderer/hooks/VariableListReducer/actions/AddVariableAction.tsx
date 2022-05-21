import { addAddresseeVariableToList } from "../../../utils/Addressee";
import { Variable } from "../../../utils/VariableList";
import { IVariablesReducerAction, VariablesReducerState } from "../types";


export class AddVariableAction implements IVariablesReducerAction {
    private _newVariable: Variable;

    public constructor(newVariable: Variable) {
        this._newVariable = newVariable;
    }
    public Action(state: VariablesReducerState): VariablesReducerState {
        const { variableList, addresseeList } = { ...state };
        variableList.push(this._newVariable);
        const newAddresseeList = addAddresseeVariableToList(addresseeList, this._newVariable);

        return {
            variableList: [...variableList],
            addresseeList: newAddresseeList
        };
    }
}
