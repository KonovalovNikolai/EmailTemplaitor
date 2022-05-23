import { addAddresseeVariableToList } from "../../../utils/Addressee";
import { Variable } from "../../../utils/VariableList";
import { IDocumentReducerAction, DocumentReducerState } from "../types";


export class AddVariableAction implements IDocumentReducerAction {
  private _newVariable: Variable;

  public constructor(newVariable: Variable) {
    this._newVariable = newVariable;
  }
  public Action(state: DocumentReducerState): DocumentReducerState {
    const { variableList, addresseeList } = { ...state };
    variableList.push(this._newVariable);
    const newAddresseeList = addAddresseeVariableToList(addresseeList, this._newVariable);

    return {
      ...state,
      variableList: [...variableList],
      addresseeList: newAddresseeList
    };
  }
}
