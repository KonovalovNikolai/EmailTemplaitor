import { removeAddresseeVariableFromList } from "../../../utils/Addressee";
import { Variable, removeVariableFromList } from "../../../utils/VariableList";
import { DocumentReducerState, IDocumentReducerAction } from "../types";

export class DeleteVariableAction implements IDocumentReducerAction {
  private _variable: Variable;

  public constructor(variable: Variable) {
    this._variable = variable;
  }

  public Action(state: DocumentReducerState): DocumentReducerState {
    const { variableList, addresseeList } = { ...state };
    const newVariableList = removeVariableFromList(variableList, this._variable);
    const newAddresseeList = removeAddresseeVariableFromList(addresseeList, this._variable);

    state.upToDateStatus = false;

    return {
      ...state,
      variableList: newVariableList,
      addresseeList: newAddresseeList,
    };
  }
}
