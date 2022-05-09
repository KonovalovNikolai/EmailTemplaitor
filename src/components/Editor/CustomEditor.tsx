import React, { useCallback, useMemo } from 'react';
import {
    createEditor,
    Descendant
} from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { withMentions } from './plugins/withMentions';

import { Box, Divider } from '@mui/material';

import { SlateToolBar } from './components/Toolbar/Toolbar';
import CustomSlateEditor from './CustomSlateEditor';

import { Field } from '../../utils/FieldList';
import { IFieldsReducerAction } from '../../hooks/FieldListReducer';
import { EditableList } from '../EditableList';
import { isMarkActive, toggleMark, isBlockActive, toggleBlock } from './utils';

interface Props {
    value: Descendant[];
    fieldList: Field[];
    onDocumentChange: React.Dispatch<any>;
    onFieldListChange: React.Dispatch<IFieldsReducerAction>;
}

const CustomEditor = ({ value, fieldList, onDocumentChange, onFieldListChange }: Props) => {
    // Инициализация редактора
    const editor = useMemo(
        () => withMentions(withReact(withHistory(createEditor()))),
        []
    );

    //#region -- Format change callbacks --
    const isMarkActiveCallback = useCallback(
        (format: string) => {
            return isMarkActive(editor, format);
        },
        [editor]
    );

    const toggleMarkCallback = useCallback(
        (format: string) => {
            toggleMark(editor, format);
        },
        [editor]
    );

    const isBlockActiveCallback = useCallback(
        (format: string, blockType: string) => {
            return isBlockActive(editor, format, blockType);
        },
        [editor]
    );

    const toggleBlockCallback = useCallback(
        (format: string) => {
            toggleBlock(editor, format);
        },
        [editor]
    );
    //#endregion

    return (
        <Box
            sx={{
                display: "flex",
                height: "-webkit-fill-available",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    width: 0.7,
                    paddingRight: "10px",
                }}
            >
                <CustomSlateEditor
                    editor={editor}
                    fieldList={fieldList}
                    value={value}
                    onChange={onDocumentChange}
                />
            </Box>
            <Divider orientation='vertical' />
            <Box
                sx={{
                    width: 0.3,
                    paddingLeft: "10px",
                }}
            >
                <Box height={0.3}>
                    <SlateToolBar
                        isMarkActive={isMarkActiveCallback}
                        toggleMark={toggleMarkCallback}
                        isBlockActive={isBlockActiveCallback}
                        toggleBlock={toggleBlockCallback}
                    />
                </Box>
                <Divider />
                <Box height={0.7}>
                    <EditableList
                        fieldList={fieldList}
                        onChange={onFieldListChange}
                    />
                </Box>
            </Box>
        </Box >
    );
};

export default CustomEditor;
