import { renameAddresseeVariableInList } from "../../../utils/Addressee";
import { Variable, renameVariableInList } from "../../../utils/VariableList";
import { IDocumentReducerAction, DocumentReducerState } from "../types";


export class RenameVariableAction implements IDocumentReducerAction {
  private _variable: Variable;
  private _newVariable: Variable;

  public constructor(variable: Variable, newVariable: Variable) {
    this._variable = variable;
    this._newVariable = newVariable;
  }

  public Action(state: DocumentReducerState): DocumentReducerState {
    const { variableList, addresseeList } = { ...state };
    const newVariableList = renameVariableInList(variableList, this._variable, this._newVariable);
    const newAddresseeList = renameAddresseeVariableInList(addresseeList, this._variable, this._newVariable);

    state.upToDateStatus = false;

    return {
      ...state,
      variableList: newVariableList,
      addresseeList: newAddresseeList
    };
  }
}
