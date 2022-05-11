import { Box, PopperProps, styled } from "@mui/material";
import { FunctionComponent, memo, useCallback, useState } from "react";
import { Descendant, Editor, Range, Transforms } from 'slate';
import { Editable, Slate } from "slate-react";
import { Field, filterFieldList, getFieldNameList } from "../../utils/FieldList";
import { EditableContainer } from "../ScrollableBox";
import AutoCompletePoper from "./components/AutoCompletePoper/AutoCompletePoper";
import RenderElement from "./elements/RenderElement";
import RenderLeaf from "./elements/RenderLeaf";
import { getAutoCompleteData } from "./utils/getAutoCompleteData";
import { getBoundingClientRectFromRange } from "./utils/GetBoundingClientRectFromRange";
import { insertMention } from "./utils/insertMention";

interface CustomSlateEditorProps {
    editor: Editor;
    value: Descendant[];
    fieldList: Field[];
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

    const filteredFields = filterFieldList(fieldList, autoCompleteData?.searchValue);
    const fieldNames = getFieldNameList(filteredFields).sort().slice(0, 10);

    const handleChange = useCallback(
        (value: Descendant[]) => {
            onChange(value);

            const data = getAutoCompleteData(editor);
            if (!data) {
                setAutoCompleteData(null);
                return;
            };

            const getBoundingClientRect = () =>
                getBoundingClientRectFromRange(editor, data.targetRange);

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
                            newData.listIndex = index >= fieldNames.length - 1 ? 0 : index + 1;
                            return newData;
                        });
                        break;
                    case 'ArrowUp':
                        event.preventDefault();
                        setAutoCompleteData(prevData => {
                            const index = prevData.listIndex;
                            const newData = { ...prevData };
                            newData.listIndex = index >= fieldNames.length - 1 ? 0 : index - 1;
                            return newData;
                        });
                        break;
                    case 'Tab':
                    case 'Enter':
                        event.preventDefault();
                        Transforms.select(editor, autoCompleteData.targetRange);
                        insertMention(editor, fieldNames[autoCompleteData.listIndex]);
                        break;
                    case 'Escape':
                        event.preventDefault();
                        setAutoCompleteData(null);
                        break;
                }
            }
        },
        [fieldNames, autoCompleteData]
    );

    return (
        <>
            <Slate
                editor={editor}
                value={value}
                onChange={handleChange}
            >
                <EditableContainer>
                    <Editable
                        className='editable'
                        onKeyDown={handleKeyDown}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onBlur={handleBlur}
                        spellCheck
                        autoFocus
                    />
                </EditableContainer>
            </Slate>
            <AutoCompletePoper
                anchorEl={autoCompleteData?.anchorEl}
                chars={fieldNames}
                open={!!autoCompleteData}
                index={autoCompleteData?.listIndex}
                onInsert={(value) => {
                    Transforms.select(editor, autoCompleteData?.targetRange);
                    insertMention(editor, value);
                }}
            />
        </>
    );
};

export default memo(CustomSlateEditor);
