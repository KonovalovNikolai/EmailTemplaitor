import EditorDocument from "renderer/utils/EditorDocument";
import { DocumentReducerState, IDocumentReducerAction } from "../types";

export class SetEditorDocumentAction implements IDocumentReducerAction {
  constructor(private _editorDocument: EditorDocument) { }

  public Action(state: DocumentReducerState): DocumentReducerState {
    const [document, variables, addressees] = this._editorDocument;

    return {
      document: document,
      addresseeList: addressees,
      variableList: variables,
    };
  }
}
