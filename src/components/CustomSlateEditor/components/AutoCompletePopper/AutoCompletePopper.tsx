import { Paper, Popper, PopperProps } from "@mui/material";
import { styled } from "@mui/system";
import { FunctionComponent, useCallback, useState } from "react";

import { AutocompleteListItem } from "./AutocompleteListItem";

interface AutoCompletePopperProps {
    open: boolean
    anchorEl: PopperProps['anchorEl']
    chars: string[]
    index: Number
    onInsert: (word: string) => void
}

const AutoCompleteContainer = styled("div")({
    background: "white",
    width: "200px",
    boxShadow: "0 0 5px rgba(0,0,0,0.5)",
});

const AutoCompletePopper: FunctionComponent<AutoCompletePopperProps> = ({ open, anchorEl, chars, index, onInsert }) => {

    return (
        <Popper
            id="auto-complete-list-popper"
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
        >
            <AutoCompleteContainer>
                {chars.map((char, i) => (
                    <AutocompleteListItem
                        key={char}
                        char={char}
                        isSelected={i === index}
                        onClick={() => {
                            onInsert(char)
                        }}
                    />
                ))}
            </AutoCompleteContainer>
        </Popper>
    );
}

export default AutoCompletePopper;