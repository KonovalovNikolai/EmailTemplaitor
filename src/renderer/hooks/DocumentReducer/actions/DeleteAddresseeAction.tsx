import { Addressee } from "../../../utils/Addressee";
import { IDocumentReducerAction, DocumentReducerState } from "../types";


export class DeleteAddresseeAction implements IDocumentReducerAction {
  public constructor(private _indexes: Set<number>, private _shouldUpdate: boolean) { }

  public Action(state: DocumentReducerState): DocumentReducerState {
    const newAddresseeList: Addressee[] = [];
    for (let index = 0; index < state.addresseeList.length; index++) {
      if (!this._indexes.has(index)) {
        newAddresseeList.push(state.addresseeList[index]);
      }
    }

    state.upToDateStatus = false;

    if (this._shouldUpdate) {
      return {
        ...state,
        addresseeList: newAddresseeList
      };
    }
    else {
      return state;
    }
  }
}
