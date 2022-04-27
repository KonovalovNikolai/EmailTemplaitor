import React, { useCallback, useMemo } from 'react';
import {
    createEditor,
    Descendant
} from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

import { withMentions } from './plugins/withMentions';

import { Box } from '@mui/material';

import { EditableList } from '../EditableList/EditableList';
import { FieldList } from '../EditableList/utils/FieldList';
import { SlateToolBar } from './components/Toolbar/Toolbar';
import CustomSlateEditor from './CustomSlateEditor';

import isMarkActive from './utils/isMarkActive';
import toggleMark from './utils/toggleMark';
import isBlockActive from './utils/isBlockActive';
import toggleBlock from './utils/toggleBlock';

interface Props {
    value: Descendant[];
    list: FieldList;
    onChange: React.Dispatch<any>;
    onListChange: React.Dispatch<React.SetStateAction<FieldList>>;
}

const CustomEditor = ({ value, list, onChange, onListChange }: Props) => {
    // Инициализайия редактора
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
                width: "800px",
                height: "300px",
                m: "20px auto",
                p: "20px",
                background: "white",
            }}
        >
            <CustomSlateEditor
                editor={editor}
                fieldList={list}
                value={value}
                onChange={onChange}
            />
            <Box
                sx={{
                    width: 0.3,
                }}
            >
                <Box
                    sx={{
                        height: 0.25,
                    }}
                >
                    <SlateToolBar
                        isMarkActive={isMarkActiveCallback}
                        toggleMark={toggleMarkCallback}
                        isBlockActive={isBlockActiveCallback}
                        toggleBlock={toggleBlockCallback}
                    />
                </Box>
                <EditableList
                    fieldList={list}
                    onChange={onListChange}
                />
            </Box>
        </Box >
    );
};

export default CustomEditor;
