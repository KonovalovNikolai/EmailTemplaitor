import React, { useCallback, useMemo } from 'react';
import {
    createEditor,
    Descendant
} from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

import { withMentions } from './plugins/withMentions';

import { Box, Divider } from '@mui/material';

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
                    fieldList={list}
                    value={value}
                    onChange={onChange}
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
                        fieldList={list}
                        onChange={onListChange}
                    />
                </Box>
            </Box>
        </Box >
    );
};

export default CustomEditor;
