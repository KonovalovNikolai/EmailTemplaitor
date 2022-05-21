import { Editor } from "slate"

export const withVariable = (editor: Editor) => {
    const { isInline, isVoid } = editor

    editor.isInline = element => {
        return element.type === 'variable' ? true : isInline(element)
    }

    editor.isVoid = element => {
        return element.type === 'variable' ? true : isVoid(element)
    }

    return editor;
}