import { removeAddresseeVariableFromList } from "../../../utils/Addressee";
import { Variable, removeVariableFromList } from "../../../utils/VariableList";
import { VariablesReducerState, IVariablesReducerAction } from "../types";

export class DeleteVariableAction implements IVariablesReducerAction {
    private _variable: Variable;

    public constructor(variable: Variable) {
        this._variable = variable;
    }

    public Action(state: VariablesReducerState): VariablesReducerState {
        const { variableList, addresseeList } = { ...state };
        const newVariableList = removeVariableFromList(variableList, this._variable);
        const newAddresseeList = removeAddresseeVariableFromList(addresseeList, this._variable);

        return {
            variableList: newVariableList,
            addresseeList: newAddresseeList,
        };
    }
}
