import { List, Paper, Popper, PopperProps } from "@mui/material";
import { styled } from "@mui/system";
import { FunctionComponent, useCallback, useState } from "react";

import { AutocompleteListItem } from "./AutocompleteListItem";

interface AutoCompletePopperProps {
    open: boolean;
    anchorEl: PopperProps['anchorEl'];
    chars: string[];
    index: Number;
    onInsert: (word: string) => void;
}

const AutoCompleteList = styled(Paper, { name: "AutoCompleteList" })({
    borderRadius: 0,
    width: "200px",
});

const AutoCompletePopper: FunctionComponent<AutoCompletePopperProps> = ({ open, anchorEl, chars, index, onInsert }) => {

    return (
        <Popper
            id="auto-complete-list-popper"
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
        >
            <AutoCompleteList elevation={1} >
                <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
                    {chars.map((char, i) => (
                        <AutocompleteListItem
                            key={char}
                            char={char}
                            isSelected={i === index}
                            onClick={() => {
                                onInsert(char);
                            }}
                        />
                    ))}
                </List>
            </AutoCompleteList>
        </Popper>
    );
};

export default AutoCompletePopper;