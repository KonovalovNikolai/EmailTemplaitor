import { useSlate } from "slate-react"

import toggleBlock from "../../utils/toggleBlock"

export const BlockButton = ({ format, text }) => {
    const editor = useSlate()
    return (
        <button
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            {text}
        </button>
    )
}