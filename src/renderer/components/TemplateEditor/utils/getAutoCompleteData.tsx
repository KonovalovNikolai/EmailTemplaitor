import { Editor, Range } from 'slate'

type ReturnType = {
    searchValue: string
    targetRange: Range
}

export function getAutoCompleteData(editor: Editor): ReturnType | null {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {

        const [start] = Range.edges(selection);

        const charBefore = Editor.before(editor, start, { unit: 'character' })
        const range = charBefore && Editor.range(editor, charBefore, start);
        const character = range && Editor.string(editor, range);

        if (character === "#") {
            return {
                searchValue: "",
                targetRange: range
            };
        }

        const wordBefore = Editor.before(editor, start, { unit: 'word' });
        const before = wordBefore && Editor.before(editor, wordBefore);
        const beforeRange = before && Editor.range(editor, before, start);
        const beforeText = beforeRange && Editor.string(editor, beforeRange);

        const beforeMatch = beforeText && beforeText.match(/^#([\wа-я]+)$/);
        const after = Editor.after(editor, start);
        const afterRange = Editor.range(editor, start, after);
        const afterText = Editor.string(editor, afterRange);
        const afterMatch = afterText.match(/^(\s|$)/);

        if (beforeMatch && afterMatch) {
            return {
                searchValue: beforeMatch[1],
                targetRange: beforeRange
            }
        }
    }

    return null
}
