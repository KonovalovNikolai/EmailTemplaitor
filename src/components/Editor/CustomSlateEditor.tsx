import { Box, PopperProps } from "@mui/material";
import { FunctionComponent, memo, useCallback, useState } from "react";
import {
    Descendant, Editor, Range, Transforms
} from 'slate';
import { Editable, Slate } from "slate-react";
import { FieldList } from "../EditableList/utils/FieldList";
import ScrollableBox from "../ScrollableBox";
import AutoCompletePoper from "./components/AutoCompletePoper/AutoCompletePoper";
import { SlateToolBar } from "./components/Toolbar/Toolbar";
import RenderElement from "./elements/RenderElement";
import RenderLeaf from "./elements/RenderLeaf";
import { getAutoCompleteData } from "./utils/getAutoCompleteData";
import { GetBoundingClientRectFromRange } from "./utils/GetBoundingClientRectFromRange";
import { insertMention } from "./utils/insertMention";

interface CustomSlateEditorProps {
    editor: Editor;
    value: Descendant[];
    fieldList: FieldList;
    onChange: React.Dispatch<any>;
}

type AutoCompleteData = {
    searchValue: string;
    targetRange: Range;
    anchorEl: PopperProps['anchorEl'];
    listIndex: number;
};

const CustomSlateEditor: FunctionComponent<CustomSlateEditorProps> = ({ editor, value, fieldList, onChange }) => {
    const renderElement = useCallback(props => <RenderElement {...props} />, []);
    const renderLeaf = useCallback(props => <RenderLeaf {...props} />, []);

    const [autoCompleteData, setAutoCompleteData] = useState<AutoCompleteData | null>(null);

    const chars = fieldList.GetListOfNames(autoCompleteData?.searchValue).sort().slice(0, 10);

    const handleChange = useCallback(
        (value: Descendant[]) => {
            onChange(value);

            const data = getAutoCompleteData(editor);
            if (!data) {
                setAutoCompleteData(null);
                return;
            };

            const getBoundingClientRect = () =>
                GetBoundingClientRectFromRange(editor, data.targetRange);

            const autoCompleteData: AutoCompleteData = {
                anchorEl: { getBoundingClientRect },
                listIndex: 0,
                searchValue: data.searchValue,
                targetRange: data.targetRange
            };

            setAutoCompleteData(autoCompleteData);
        },
        []
    );

    const handleBlur = useCallback(
        () => setAutoCompleteData(null),
        []
    );

    const handleKeyDown = useCallback(
        event => {
            if (!!autoCompleteData) {

                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault();
                        setAutoCompleteData(prevData => {
                            const index = prevData.listIndex;
                            const newData = { ...prevData };
                            newData.listIndex = index >= chars.length - 1 ? 0 : index + 1;
                            return newData;
                        });
                        break;
                    case 'ArrowUp':
                        event.preventDefault();
                        setAutoCompleteData(prevData => {
                            const index = prevData.listIndex;
                            const newData = { ...prevData };
                            newData.listIndex = index >= chars.length - 1 ? 0 : index - 1;
                            return newData;
                        });
                        break;
                    case 'Tab':
                    case 'Enter':
                        event.preventDefault();
                        Transforms.select(editor, autoCompleteData.targetRange);
                        insertMention(editor, chars[autoCompleteData.listIndex]);
                        break;
                    case 'Escape':
                        event.preventDefault();
                        setAutoCompleteData(null);
                        break;
                }
            }
        },
        [chars, autoCompleteData]
    );

    return (
        <Box
            sx={{
                height: "-webkit-fill-available"
            }}
        >
            <Slate
                editor={editor}
                value={value}
                onChange={handleChange}
            >
                <ScrollableBox
                    sx={{
                        overflowY: "overlay",
                        height: "-webkit-fill-available",
                    }}
                >
                    <Box
                        sx={{
                            p: "10px 10px 0 10px"
                        }}
                    >
                        <Editable
                            className='editable'
                            onKeyDown={handleKeyDown}
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            onBlur={handleBlur}
                            spellCheck
                            autoFocus
                        />
                    </Box>
                </ScrollableBox>
            </Slate>
            <AutoCompletePoper
                anchorEl={autoCompleteData?.anchorEl}
                chars={chars}
                open={!!autoCompleteData}
                index={autoCompleteData?.listIndex}
                onInsert={(value) => {
                    Transforms.select(editor, autoCompleteData?.targetRange);
                    insertMention(editor, value);
                }}
            />
        </Box>
    );
};

export default memo(CustomSlateEditor);
