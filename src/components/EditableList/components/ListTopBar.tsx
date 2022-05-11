import { Box, IconButton, InputAdornment, styled, TextField } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import React, { memo } from "react";

import { EditableListTopBarProps } from "../types";

const ListTopBarContainer = styled("div")({
    display: 'flex',
    marginBottom: "5px",
    "& .list-search-field": {},
    "& .MuiIconButton-root": {
        margin: "auto",
    }
});

const ListTopBar = ({ onChange }: EditableListTopBarProps) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(prevState => {
            const newState = { ...prevState };
            newState.searchValue = e.target.value.toLowerCase();
            return newState;
        });
    };

    return (
        <ListTopBarContainer>
            <TextField
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
                onChange={handleOnChange}
            />
            <IconButton
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
        </ListTopBarContainer>
    );
};

export default memo(ListTopBar);