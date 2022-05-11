import React, { useCallback, useMemo, useState } from 'react';
import {
    createEditor,
    Descendant,
    Range
} from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import { withMentions } from './plugins/withMentions';

import { Divider, PopperProps } from '@mui/material';

import { SlateToolBar } from './components/Toolbar/Toolbar';
import CustomSlateEditor from './CustomSlateEditor';

import { AddFieldAction, DeleteFieldAction, IFieldsReducerAction, RenameFieldAction } from '../../hooks/FieldListReducer';
import { createDeletableField, Field, getFieldName, getFieldNameList, isFieldDeletable } from '../../utils/FieldList';
import { EditableList } from '../EditableList';
import { EditorContainer } from '../ScrollableBox';
import { getAutoCompleteData, getBoundingClientRectFromRange, toggleBlock, toggleMark } from './utils';

interface Props {
    value: Descendant[];
    fieldList: Field[];
    onDocumentChange: React.Dispatch<any>;
    onFieldListChange: React.Dispatch<IFieldsReducerAction>;
}

export interface AutoCompleteData {
    searchValue: string;
    targetRange: Range;
    anchorEl: PopperProps['anchorEl'];
    listIndex: number;
};

const CustomEditor = ({ value, fieldList, onDocumentChange, onFieldListChange }: Props) => {
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
            <Slate
                editor={editor}
                value={value}
                onChange={handleChange}
            >
                <div className='left-side'>
                    <CustomSlateEditor
                        editor={editor}
                        autoCompleteList={autoCompleteList}
                        autoCompleteData={autoCompleteData}
                        setAutoCompleteData={setAutoCompleteData}
                    />
                </div>
                <Divider orientation='vertical' />
                <div className='right-side'>
                    <SlateToolBar/>
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
            </Slate>
        </EditorContainer >
    );
};

export default CustomEditor;
