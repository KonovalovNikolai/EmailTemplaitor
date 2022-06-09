import { Editor, Element as SlateElement, Transforms } from "slate";
import { VariableElement } from "../elementTypes";

export function removeVariables(editor: Editor, character: string) {
    Transforms.removeNodes(editor, {
        at: [],
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === "variable" &&
            n.character === character
    });
}
