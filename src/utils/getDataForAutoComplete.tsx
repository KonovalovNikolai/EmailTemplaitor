import { BasePoint, BaseRange, Editor } from "slate"

type Result = {
    range: BaseRange
    word: string
}

export function getDataForAutoComplete(editor: Editor, start: BasePoint): Result {
    const charBefore = Editor.before(editor, start, { unit: 'character' })
    const range = charBefore && Editor.range(editor, charBefore, start)
    const character = range && Editor.string(editor, range)

    if (character === "#") {
        return {
            range: range,
            word: ""
        }
    }

    const wordBefore = Editor.before(editor, start, { unit: 'word' })
    const before = wordBefore && Editor.before(editor, wordBefore)
    const beforeRange = before && Editor.range(editor, before, start)
    const beforeText = beforeRange && Editor.string(editor, beforeRange)

    const beforeMatch = beforeText && beforeText.match(/^#(\w+)$/)
    const after = Editor.after(editor, start)
    const afterRange = Editor.range(editor, start, after)
    const afterText = Editor.string(editor, afterRange)
    const afterMatch = afterText.match(/^(\s|$)/)

    if (beforeMatch && afterMatch) {
        return {
            range: beforeRange,
            word: beforeMatch[1]
        }
    }
}