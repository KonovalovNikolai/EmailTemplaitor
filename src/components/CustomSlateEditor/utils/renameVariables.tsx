import { Editor, Element as SlateElement, Transforms } from "slate";
import { VariableElement } from "../elementTypes";

export function renameVariables(editor: Editor, character: string, newCharacter) {
    console.log("start");


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

        console.log(variable);

        if (!Editor.isEditor(variable) &&
            SlateElement.isElement(variable) &&
            variable.type === "variable") {
            const newVariable = { ...variable, character: newCharacter };
            Transforms.setNodes(editor, newVariable, { at: cellPath });
        }
    }
    );
}