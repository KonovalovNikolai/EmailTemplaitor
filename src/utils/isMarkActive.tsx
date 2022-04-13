import { Editor, Element as SlateElement } from "slate"
import { Mention } from "../components/Editor/elements/Mention";

const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

export default isMarkActive;