import { Editor } from "slate";

import isMarkActive from "./isMarkActive";

const toggleMark = (editor:any, format:string) => {
    const isActive = isMarkActive(editor, format)

    console.log(isActive);
    

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

export default toggleMark;
