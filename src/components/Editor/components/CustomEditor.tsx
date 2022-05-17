import { memo, useCallback, useMemo, useState } from 'react';
import {
    createEditor,
    Descendant
} from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import { withMentions } from '../../CustomSlateEditor/plugins/withMentions';

import { Divider } from '@mui/material';

import { SlateToolBar } from '../../CustomSlateEditor/components/Toolbar/Toolbar';

import { AddFieldAction, DeleteFieldAction, IFieldsReducerAction, RenameFieldAction } from '../../../hooks/FieldListReducer';
import { createDeletableField, Field, getFieldName, getFieldNameList, isFieldDeletable } from '../../../utils/FieldList';
import { VariableList } from '../../EditableList';
import { getAutoCompleteData, getBoundingClientRectFromRange } from '../utils';
import { AutoCompleteData, CustomSlateEditor } from '../../CustomSlateEditor';
import { EditorContainer, EditorContainerEditableArea, EditorContainerToolbar } from '../../StyledComponents';

interface CustomEditorProps {
    value: Descendant[];
    fieldList: Field[];
    onDocumentChange: React.Dispatch<any>;
    onFieldListChange: React.Dispatch<IFieldsReducerAction>;
}

export const CustomEditor = memo(({ value, fieldList, onDocumentChange, onFieldListChange }: CustomEditorProps) => {
    // Инициализация редактора
    const editor = useMemo(
        () => withMentions(withReact(withHistory(createEditor()))),
        []
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

    const [autoCompleteData, setAutoCompleteData] = useState<AutoCompleteData | null>(null);

    const autoCompleteList = getFieldNameList(fieldList);

    const handleChange = useCallback(
        (value: Descendant[]) => {
            onDocumentChange(value);

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

    return (
        <EditorContainer>
            <Slate editor={editor} value={value} onChange={handleChange}>
                {/* Редактор */}
                <EditorContainerEditableArea>
                    <SlateToolBar />
                    <CustomSlateEditor
                        editor={editor}
                        autoCompleteList={autoCompleteList}
                        autoCompleteData={autoCompleteData}
                        setAutoCompleteData={setAutoCompleteData}
                    />
                </EditorContainerEditableArea>
                {/* Список переменных */}
                <VariableList
                    elementList={fieldList}
                    getLabel={getFieldName}
                    isChangeable={isFieldDeletable}
                    onAdd={handleAddField}
                    onRename={handleRenameField}
                    onRemove={handleRemoveField}
                />
            </Slate>
        </EditorContainer >
    );
});
