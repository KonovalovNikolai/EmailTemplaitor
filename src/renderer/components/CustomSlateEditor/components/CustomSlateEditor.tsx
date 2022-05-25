import { FunctionComponent, memo, SetStateAction, useCallback } from "react";
import { Editor, Transforms } from 'slate';
import { Editable } from "slate-react";
import AutoCompletePopper from "./AutoCompletePopper/AutoCompletePopper";
import RenderElement from "../elements/RenderElement";
import RenderLeaf from "../elements/RenderLeaf";
import { AutoCompleteData } from "../types";
import { insertVariable } from "../utils";
import { Typography } from "@mui/material";

interface CustomSlateEditorProps {
    editor: Editor;
    autoCompleteList: string[];
    autoCompleteData: AutoCompleteData;
    setAutoCompleteData: React.Dispatch<SetStateAction<AutoCompleteData>>;
}

export const CustomSlateEditor: FunctionComponent<CustomSlateEditorProps> = memo(({ editor, autoCompleteList, autoCompleteData, setAutoCompleteData }) => {
    const renderElement = useCallback(props => <RenderElement {...props} />, []);
    const renderLeaf = useCallback(props => <RenderLeaf {...props} />, []);

    let filteredList = [];
    if (autoCompleteData) {
        const searchValue = autoCompleteData.searchValue;
        filteredList = autoCompleteList.filter(e => e.toLowerCase().startsWith(searchValue)).sort().slice(0, 10);
    }

    const handleBlur: React.FocusEventHandler<HTMLElement> = useCallback(
        (event) => {
            event.preventDefault();
            setAutoCompleteData(null);
        },
        []
    );

    let isPopperOpen = !!autoCompleteData && filteredList.length > 0;
    let anchorEl = null;
    let handleKeyDown;
    let index;

    if (isPopperOpen) {
        index = autoCompleteData.listIndex;
        anchorEl = autoCompleteData.anchorEl;

        handleKeyDown =
            event => {
                if (!!autoCompleteData && filteredList.length > 0) {

                    switch (event.key) {
                        case 'ArrowDown':
                            event.preventDefault();
                            setAutoCompleteData(prevData => {
                                const index = prevData.listIndex;
                                const newData = { ...prevData };
                                newData.listIndex = index >= filteredList.length - 1 ? 0 : index + 1;
                                return newData;
                            });
                            break;
                        case 'ArrowUp':
                            event.preventDefault();
                            setAutoCompleteData(prevData => {
                                const index = prevData.listIndex;
                                const newData = { ...prevData };
                                newData.listIndex = index <= 0 ? filteredList.length - 1 : index - 1;
                                return newData;
                            });
                            break;
                        case 'Tab':
                        case 'Enter':
                            event.preventDefault();
                            Transforms.select(editor, autoCompleteData.targetRange);
                            insertVariable(editor, filteredList[autoCompleteData.listIndex]);
                            break;
                        case 'Escape':
                            event.preventDefault();
                            setAutoCompleteData(null);
                            break;
                    }
                }
            };
    }

    return (
        <>
            <Typography width="100%" height="100%" variant="body1" component={"div"}>
                <Editable
                    className='editable'
                    onKeyDown={handleKeyDown}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onBlur={handleBlur}
                    spellCheck
                    autoFocus
                />
            </Typography>
            <AutoCompletePopper
                anchorEl={anchorEl}
                chars={filteredList}
                open={isPopperOpen}
                index={index}
                onInsert={(value) => {
                    Transforms.select(editor, autoCompleteData?.targetRange);
                    insertVariable(editor, value);
                }}
            />
        </>
    );
});
