import { Editor, Transforms } from "slate"
import { VariableElement } from "../elementTypes";

export const insertVariable = (editor: Editor, character: string) => {
    const variable: VariableElement = {
        type: 'variable',
        character,
        children: [{ text: '' }],
    }
    Transforms.insertNodes(editor, variable)
    Transforms.move(editor)
}
