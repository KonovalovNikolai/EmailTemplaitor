import { useSlate } from "slate-react"

import isMarkActive from "../../utils/isMarkActive"
import toggleMark from "../../utils/toggleMark"

const MarkButton = ({ format, text }:any) => {
    const editor = useSlate()
    return (
        <button
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            {text}
        </button>
    )
}

export default MarkButton;