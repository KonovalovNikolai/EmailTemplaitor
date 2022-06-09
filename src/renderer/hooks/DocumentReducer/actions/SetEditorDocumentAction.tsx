import EditorDocument from "renderer/utils/EditorDocument";
import { Editor, Node, Point, Transforms } from "slate";
import { DocumentReducerState, IDocumentReducerAction } from "../types";

export class SetEditorDocumentAction implements IDocumentReducerAction {
  constructor(private _editorDocument: EditorDocument) { }

  public Action(state: DocumentReducerState): DocumentReducerState {
    const [document, variables, addressees] = this._editorDocument;

    this.resetNodes(state.editor, { nodes: document });

    return {
      ...state,
      document: document,
      addresseeList: addressees,
      variableList: variables,
      upToDateStatus: true,
    };
  }

  private resetNodes(
    editor: Editor,
    options: { nodes?: Node | Node[], at?: Location; } = {}
  ): void {
    const children = [...editor.children];

    children.forEach((node) => editor.apply({ type: 'remove_node', path: [0], node }));

    if (options.nodes) {
      const nodes = Node.isNode(options.nodes) ? [options.nodes] : options.nodes;

      nodes.forEach((node, i) => editor.apply({ type: 'insert_node', path: [i], node: node }));
    }

    const point = options.at && Point.isPoint(options.at)
      ? options.at
      : Editor.end(editor, []);

    if (point) {
      Transforms.select(editor, point);
    }

    editor.history = {
      redos: [],
      undos: [],
    };
  }
}
