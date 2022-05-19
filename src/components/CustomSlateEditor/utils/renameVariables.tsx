import { Editor, Element as SlateElement, Transforms } from "slate";
import { VariableElement } from "../elementTypes";

export function renameVariables(editor: Editor, character: string, newCharacter: string) {
    Array.from(
        Editor.nodes(editor, {
            at: [],
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "variable" &&
                n.character === character
        })
    ).forEach(element => {
        const [variable, cellPath] = element;

        const newVariable = { ...variable, character: newCharacter };
        Transforms.setNodes(editor, newVariable, { at: cellPath });
    }
    );
}