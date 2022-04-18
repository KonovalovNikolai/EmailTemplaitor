import { Box, TextField, InputAdornment, IconButton } from "@mui/material"

import SearchIcon from '@mui/icons-material/Search';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { memo } from "react";

type ListTopBarProps = {
    onChange: (value: string) => void
}

const ListTopBar = ({onChange}: ListTopBarProps) => {
    return (
        <Box
        sx={{
            display: 'flex',
            padding: '10px'
        }}
    >
        <TextField
            id="search-field"
            label="Search"
            size='small'
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            variant="standard"
            sx={{
                marginRight: "5px"
            }}

            onChange={
                (e) => {
                    onChange(e.target.value)
                }
            }
        />
        <IconButton
            sx={{
                width: "auto"
            }}
            size="small"
        >
            <SortByAlphaIcon />
            <ArrowDropUpIcon />
        </IconButton>
    </Box>
    )
}

export default memo(ListTopBar)