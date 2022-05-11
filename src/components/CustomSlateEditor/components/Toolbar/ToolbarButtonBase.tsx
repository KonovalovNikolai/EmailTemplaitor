import { IconButton } from "@mui/material";
import React, { memo, useCallback } from "react";
import { useSlate } from "slate-react";
import { isBlockActive, isMarkActive, TEXT_ALIGN_TYPES, toggleBlock, toggleMark } from "../../utils";

type ToolbarButtonBaseProps = {
    color: "default" | "primary";
    onClick: (e: React.MouseEvent) => void;
    children: React.ReactNode;
};

export const ToolbarButtonBase = memo(({ color, onClick, children }: ToolbarButtonBaseProps) => {
    return (
        <IconButton size="small"
            onClick={onClick}
            color={color}
        >
            {children}
        </IconButton>
    );
});

interface ButtonProps {
    format: string;
    children: React.ReactNode;
}
export const MarkButton = ({ format, children }: ButtonProps) => {
    const editor = useSlate();

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            toggleMark(editor, format);
        },
        []
    );

    const isActive = isMarkActive(editor, format);

    return (
        <ToolbarButtonBase
            color={isActive ? "primary" : "default"}
            onClick={handleClick}
        >
            {children}
        </ToolbarButtonBase>
    );
};

export const BlockButton = ({ format, children }: ButtonProps) => {
    const editor = useSlate();

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            toggleBlock(editor, format);
        },
        []
    );

    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    );

    return (
        <ToolbarButtonBase
            color={isActive ? "primary" : "default"}
            onClick={handleClick}
        >
            {children}
        </ToolbarButtonBase>
    );
};