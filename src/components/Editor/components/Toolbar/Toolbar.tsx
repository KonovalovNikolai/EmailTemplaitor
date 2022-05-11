import { Box } from "@mui/system";
import { memo } from "react";
import { BlockButton, MarkButton } from "./ToolbarButtonBase";

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { styled } from "@mui/material";

interface SlateToolBarProps {
    toggleMark: (format: string) => void;
    toggleBlock: (format: string) => void;
}

const SlateToolbarContainer = styled("div")({
    textAlign: "center",
    justifyContent: "center",

});

export const SlateToolBar = memo(({ toggleBlock, toggleMark }: SlateToolBarProps) => {
    const markButtonProps = {
        toggleMark
    };

    const blockButtonProps = {
        toggleBlock
    };

    return (
        <SlateToolbarContainer className="slate-toolbar">
            <div>
                <MarkButton format='bold' {...markButtonProps}>
                    <FormatBoldIcon />
                </MarkButton>
                <MarkButton format='italic' {...markButtonProps}>
                    <FormatItalicIcon />
                </MarkButton>
                <MarkButton format='underline' {...markButtonProps}>
                    <FormatUnderlinedIcon />
                </MarkButton>
            </div>
            <div>
                <BlockButton format='heading-one' {...blockButtonProps}>
                    <LooksOneIcon />
                </BlockButton>
                <BlockButton format="heading-two" {...blockButtonProps}>
                    <LooksTwoIcon />
                </BlockButton>
                <BlockButton format="numbered-list" {...blockButtonProps}>
                    <FormatListNumberedIcon />
                </BlockButton>
                <BlockButton format="bulleted-list" {...blockButtonProps}>
                    <FormatListBulletedIcon />
                </BlockButton>
            </div>
            <div>
                <BlockButton format="left" {...blockButtonProps}>
                    <FormatAlignLeftIcon />
                </BlockButton>
                <BlockButton format="center" {...blockButtonProps}>
                    <FormatAlignCenterIcon />
                </BlockButton>
                <BlockButton format="right" {...blockButtonProps}>
                    <FormatAlignRightIcon />
                </BlockButton>
                <BlockButton format="justify" {...blockButtonProps}>
                    <FormatAlignJustifyIcon />
                </BlockButton>
            </div>
        </SlateToolbarContainer>
    );
});