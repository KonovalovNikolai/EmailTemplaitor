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

import { createDeletableField, Field, getFieldName, isFieldDeletable } from '../../utils/FieldList';
import { AddFieldAction, DeleteFieldAction, IFieldsReducerAction, RenameFieldAction } from '../../hooks/FieldListReducer';
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

    const handleAddField = useCallback(
        (newFieldName: string) => {
            const newField = createDeletableField(newFieldName);
            const action = new AddFieldAction(newField);
            onFieldListChange(action);
        },
        []
    );

    const handleRenameField = useCallback(
        (field: Field, newName: string) => {
            const newField = createDeletableField(newName);
            const action = new RenameFieldAction(field, newField);
            onFieldListChange(action);
        },
        []
    );

    const handleRemoveField = useCallback(
        (field: Field) => {
            const action = new DeleteFieldAction(field);
            onFieldListChange(action);
        },
        []
    );

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
                        elementList={fieldList}
                        getLabel={getFieldName}
                        isChangeable={isFieldDeletable}
                        onAdd={handleAddField}
                        onRename={handleRenameField}
                        onRemove={handleRemoveField}
                    />
                </Box>
            </Box>
        </Box >
    );
};

export default CustomEditor;
