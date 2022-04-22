import { Box } from "@mui/system"
import { memo } from "react"
import { BlockButton, MarkButton } from "./ToolbarButtonBase"

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

export const SlateToolBar = memo(() => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                "& > :not(style)": {
                    m: "0 5px 0 5px"
                }
            }}
        >
            <Box>
                <MarkButton format='bold'>
                    <FormatBoldIcon />
                </MarkButton>
                <MarkButton format='italic'>
                    <FormatItalicIcon />
                </MarkButton>
                <MarkButton format='underline'>
                    <FormatUnderlinedIcon />
                </MarkButton>
            </Box>

            <Box>
                <BlockButton format='heading-one'>
                    <LooksOneIcon />
                </BlockButton>
                <BlockButton format="heading-two">
                    <LooksTwoIcon />
                </BlockButton>
            </Box>

            <Box>
                <BlockButton format="numbered-list">
                    <FormatListNumberedIcon />
                </BlockButton>
                <BlockButton format="bulleted-list">
                    <FormatListBulletedIcon />
                </BlockButton>
            </Box>

            <Box>
                <BlockButton format="left">
                    <FormatAlignLeftIcon />
                </BlockButton>
                <BlockButton format="center">
                    <FormatAlignCenterIcon />
                </BlockButton>
                <BlockButton format="right">
                    <FormatAlignRightIcon />
                </BlockButton>
                <BlockButton format="justify">
                    <FormatAlignJustifyIcon />
                </BlockButton>
            </Box>
        </Box>
    )
})