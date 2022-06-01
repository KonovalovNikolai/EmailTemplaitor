import { DocumentReducerState, IDocumentReducerAction } from "../types";
import { documentToJson } from "renderer/utils/FileControl";
export class SaveDocumentAction implements IDocumentReducerAction {
  public constructor(private _asyncCallback: (resultPromise: Promise<string>) => Promise<void>) { }

  public Action(state: DocumentReducerState): DocumentReducerState {
    const JSONDocument = documentToJson(state.document, state.variableList, state.addresseeList);
    this._asyncCallback(window.electron.ipcRenderer.saveDocument(JSONDocument));
    state.upToDateStatus = true;
    return { ...state };
  }
}
