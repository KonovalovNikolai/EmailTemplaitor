import { Box, TextField, InputAdornment, IconButton } from "@mui/material"

import SearchIcon from '@mui/icons-material/Search';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { memo } from "react";
import { TopBarData } from "./EditableList";

type ListTopBarProps = {
    onChange: React.Dispatch<React.SetStateAction<TopBarData>>
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
                    onChange(prevState => {
                        const newState = {...prevState}
                        newState.searchValue = e.target.value.toLowerCase()
                        return newState
                    })
                }
            }
        />
        <IconButton
            sx={{
                width: "auto"
            }}
            size="small"
            onClick={() => {
                onChange(prevState => {
                    const newState = {...prevState}
                    newState.sortState = prevState.sortState.ChangeState()
                    return newState
                })
            }}
        >
            <SortByAlphaIcon />
        </IconButton>
    </Box>
    )
}

export default memo(ListTopBar)