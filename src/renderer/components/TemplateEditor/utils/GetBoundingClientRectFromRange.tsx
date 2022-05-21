import { BaseRange, Editor } from "slate";
import { ReactEditor } from "slate-react";

export function getBoundingClientRectFromRange(editor: Editor, range: BaseRange) {
    return ReactEditor.toDOMRange(editor, range).getBoundingClientRect();
}