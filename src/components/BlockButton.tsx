import { useSlate } from "slate-react"
import isBlockActive from "../utils/isBlockActive"

import toggleBlock, { TEXT_ALIGN_TYPES } from "../utils/toggleBlock"

export const BlockButton = ({ format, text }) => {
    const editor = useSlate()
    return (
        <button
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
            style={{
                fontWeight: isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type') ? "bold" : "normal"
            }}
        >
            {text}
        </button>
    )
}