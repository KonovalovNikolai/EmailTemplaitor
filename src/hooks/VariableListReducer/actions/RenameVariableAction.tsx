import { renameAddresseeVariableInList } from "../../../utils/Addressee";
import { Variable, renameVariableInList } from "../../../utils/VariableList";
import { IVariablesReducerAction, VariablesReducerState } from "../types";


export class RenameVariableAction implements IVariablesReducerAction {
    private _variable: Variable;
    private _newVariable: Variable;

    public constructor(variable: Variable, newVariable: Variable) {
        this._variable = variable;
        this._newVariable = newVariable;
    }

    public Action(state: VariablesReducerState): VariablesReducerState {
        const { variableList, addresseeList } = { ...state };
        const newVariableList = renameVariableInList(variableList, this._variable, this._newVariable);
        const newAddresseeList = renameAddresseeVariableInList(addresseeList, this._variable, this._newVariable);

        return {
            variableList: newVariableList,
            addresseeList: newAddresseeList
        };
    }
}
