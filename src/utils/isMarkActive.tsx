import { Editor } from "slate"

const isMarkActive = (editor:any, format:string) => {
    return (new Set(Object.keys(Editor.marks(editor) ?? {}))).has(format);
}

export default isMarkActive;