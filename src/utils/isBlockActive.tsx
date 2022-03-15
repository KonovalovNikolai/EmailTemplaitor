import { Editor, Element as SlateElement } from "slate";

const isBlockActive = (editor: Editor, format: string) => {
    const nodes = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === format,
    })
    return !!nodes.next().value
}

export default isBlockActive;