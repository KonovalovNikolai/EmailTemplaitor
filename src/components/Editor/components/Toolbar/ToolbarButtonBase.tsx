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
    toggleMark: (format: string) => void
}

export const MarkButton = ({ format, children, toggleMark }: MarkButtonProps) => {
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
    toggleBlock: (format: string) => void
}

export const BlockButton = ({ format, children, toggleBlock }: BlockButtonProps) => {
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