import { IconButton } from "@mui/material"
import React, { memo, useCallback } from "react"
import { useSlate } from "slate-react"

import toggleBlock from "../../utils/toggleBlock"
import toggleMark from "../../utils/toggleMark"

type ToolbarButtonBaseProps = {
    onClick: (e: React.MouseEvent) => void
    children: React.ReactNode
}

export const ToolbarButtonBase = memo(({ onClick, children }: ToolbarButtonBaseProps) => {
    return (
        <IconButton
            onClick={onClick}
        >
            {children}
        </IconButton>
    )
})

type ButtonProps = {
    format: string
    children: React.ReactNode
}
 
export const MarkButton = ({ format, children }: ButtonProps) => {
    const editor = useSlate()
    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            toggleMark(editor, format)
        },
        []
    )

    return (
        <ToolbarButtonBase
            onClick={handleClick}
        >
            {children}
        </ToolbarButtonBase>
    )
}

export const BlockButton = ({ format, children }: ButtonProps) => {
    const editor = useSlate()
    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            toggleBlock(editor, format)
        },
        []
    )

    return (
        <ToolbarButtonBase
            onClick={handleClick}
        >
            {children}
        </ToolbarButtonBase>
    )
}