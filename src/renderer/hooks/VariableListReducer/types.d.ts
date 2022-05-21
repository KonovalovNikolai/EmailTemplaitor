import { Variable } from "../../utils/VariableList";
import { Addressee } from "../../utils/Addressee";

export interface VariablesReducerState {
    variableList: Variable[];
    addresseeList: Addressee[];
};

export interface IVariablesReducerAction {
    Action(state: VariablesReducerState): VariablesReducerState;
}
