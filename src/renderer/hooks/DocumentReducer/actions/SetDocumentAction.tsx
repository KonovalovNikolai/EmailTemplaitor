import { Descendant } from "slate";
import { DocumentReducerState, IDocumentReducerAction } from "../types";

export class SetDocumentAction implements IDocumentReducerAction {
  constructor(private _document: Descendant[], private _shouldUpdate: boolean) { }

  public Action(state: DocumentReducerState): DocumentReducerState {
    state.upToDateStatus = false;

    if (this._shouldUpdate) {
      return {
        ...state,
        document: this._document,
      };
    }
    else {
      state.document = this._document;
      return state;
    }
  }
}
