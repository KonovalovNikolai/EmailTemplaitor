import { Box, IconButton, InputAdornment, TextField } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { memo } from "react";

import { EditableListTopBarProps } from "../types";

const ListTopBar = ({ onChange }: EditableListTopBarProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
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
                            const newState = { ...prevState };
                            newState.searchValue = e.target.value.toLowerCase();
                            return newState;
                        });
                    }
                }
            />
            <IconButton
                sx={{
                    margin: "auto"
                }}
                size="small"
                onClick={() => {
                    onChange(prevState => {
                        const newState = { ...prevState };
                        newState.sortState = prevState.sortState.ChangeState();
                        return newState;
                    });
                }}
            >
                <SortByAlphaIcon />
            </IconButton>
        </Box>
    );
};

export default memo(ListTopBar);