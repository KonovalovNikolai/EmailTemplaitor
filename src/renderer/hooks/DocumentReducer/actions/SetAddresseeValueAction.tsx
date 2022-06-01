import { DocumentReducerState, IDocumentReducerAction } from "../types";

export class SetAddresseeValueAction implements IDocumentReducerAction {
  constructor(private _index: number, private _variable: string, private _value: string) { }

  public Action(state: DocumentReducerState): DocumentReducerState {
    if (this._index < 0 || this._index > state.addresseeList.length) {
      return state;
    }

    state.upToDateStatus = false;
    state.addresseeList[this._index][this._variable] = this._value;
    return { ...state };
  }
}
