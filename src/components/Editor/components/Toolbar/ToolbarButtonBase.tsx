import { IconButton } from "@mui/material";
import React, { memo, useCallback } from "react";

type ToolbarButtonBaseProps = {
    onClick: (e: React.MouseEvent) => void
    children: React.ReactNode
}

export const ToolbarButtonBase = memo(({ onClick, children }: ToolbarButtonBaseProps) => {
    return (
        <IconButton size="small"
            onClick={onClick}
        >
            {children}
        </IconButton>
    )
})

interface ButtonProps {
    format: string
    children: React.ReactNode
}
 
interface MarkButtonProps extends ButtonProps {
    isMarkActive: (format: string) => boolean
    toggleMark: (format: string) => void
}

export const MarkButton = ({ format, children, isMarkActive, toggleMark }: MarkButtonProps) => {
    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            toggleMark(format)
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

interface BlockButtonProps extends ButtonProps {
    isBlockActive: (format: string, blockType: string) => boolean
    toggleBlock: (format: string) => void
}

export const BlockButton = ({ format, children, isBlockActive, toggleBlock }: BlockButtonProps) => {
    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            toggleBlock(format)
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