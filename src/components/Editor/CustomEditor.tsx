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

import { AddFieldAction, DeleteFieldAction, IFieldsReducerAction, RenameFieldAction } from '../../hooks/FieldListReducer';
import { createDeletableField, Field, getFieldName, isFieldDeletable } from '../../utils/FieldList';
import { EditableList } from '../EditableList';
import { toggleBlock, toggleMark } from './utils';
import { EditorContainer } from '../ScrollableBox';

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

    const toggleMarkCallback = useCallback(
        (format: string) => {
            toggleMark(editor, format);
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
        <EditorContainer>
            <div className='left-side'>
                <CustomSlateEditor
                    editor={editor}
                    fieldList={fieldList}
                    value={value}
                    onChange={onDocumentChange}
                />
            </div>
            <Divider orientation='vertical' />
            <div className='right-side'>
                <SlateToolBar
                    toggleMark={toggleMarkCallback}
                    toggleBlock={toggleBlockCallback}
                />
                <Divider />
                <EditableList
                    elementList={fieldList}
                    getLabel={getFieldName}
                    isChangeable={isFieldDeletable}
                    onAdd={handleAddField}
                    onRename={handleRenameField}
                    onRemove={handleRemoveField}
                />
            </div>
        </EditorContainer >
    );
};

export default CustomEditor;
