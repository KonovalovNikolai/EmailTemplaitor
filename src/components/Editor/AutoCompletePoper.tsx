import { Paper, Popper, PopperProps } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";

import { AutocompleteListItem } from "./AutocompleteListItem";

interface AutoCompletePoperProps {
    open: boolean
    anchorEl: PopperProps['anchorEl']
    chars: string[]
    index: Number
    onInsert: (word: string) => void
}

const AutoCompletePoper: FunctionComponent<AutoCompletePoperProps> = ({ open, anchorEl, chars, index, onInsert }) => {

    return (
        <Popper
            id="auto-complete-list-popper"
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
        >
            <Paper>
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
            </Paper>
        </Popper>
    );
}

export default AutoCompletePoper;