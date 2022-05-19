import { memo, useCallback, useMemo, useState } from 'react';
import {
    createEditor,
    Descendant
} from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import { withVariable } from '../../CustomSlateEditor/plugins/withVariables';

import { Divider } from '@mui/material';

import { SlateToolBar } from '../../CustomSlateEditor/components/Toolbar/Toolbar';

import { AddFieldAction, DeleteFieldAction, IFieldsReducerAction, RenameFieldAction } from '../../../hooks/FieldListReducer';
import { createDeletableVariable, Variable, getVariableName, getVariableNameList, isVariableDeletable } from '../../../utils/VariableList';
import { EditableList } from '../../EditableList';
import { getAutoCompleteData, getBoundingClientRectFromRange } from '../utils';
import { AutoCompleteData, CustomSlateEditor, insertVariable, renameVariables } from '../../CustomSlateEditor';
import { EditorBox, TemplateEditorBox } from '../../StyledComponents';
import { EditableArea } from '../../StyledComponents/components/EditableArea';

interface TemplateEditorProps {
    value: Descendant[];
    fieldList: Variable[];
    onDocumentChange: React.Dispatch<any>;
    onFieldListChange: React.Dispatch<IFieldsReducerAction>;
}

export const TemplateEditor = memo(({ value, fieldList, onDocumentChange, onFieldListChange }: TemplateEditorProps) => {
    // Инициализация редактора
    const editor = useMemo(
        // () => withVariable(withReact(withHistory(createEditor()))),
        () => withVariable(withReact(createEditor())),
        []
    );

    const handleAddVariable = useCallback(
        (newVariableName: string) => {
            const newField = createDeletableVariable(newVariableName);
            const action = new AddFieldAction(newField);
            onFieldListChange(action);
        },
        []
    );

    const handleRenameVariable = useCallback(
        (variable: Variable, newName: string) => {
            const newField = createDeletableVariable(newName);
            const action = new RenameFieldAction(variable, newField);
            onFieldListChange(action);

            renameVariables(editor, variable.name, newName);
        },
        []
    );

    const handleRemoveVariable = useCallback(
        (variable: Variable) => {
            const action = new DeleteFieldAction(variable);
            onFieldListChange(action);
        },
        []
    );

    const handleListElementClick = useCallback(
        (element: Variable) => {
            insertVariable(editor, element.name);
        },
        []
    );

    const [autoCompleteData, setAutoCompleteData] = useState<AutoCompleteData | null>(null);

    const autoCompleteList = getVariableNameList(fieldList);

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
        <TemplateEditorBox>
            <Slate editor={editor} value={value} onChange={handleChange}>
                <EditorBox>
                    <SlateToolBar />
                    <EditableArea elevation={0}>
                        <CustomSlateEditor
                            editor={editor}
                            autoCompleteList={autoCompleteList}
                            autoCompleteData={autoCompleteData}
                            setAutoCompleteData={setAutoCompleteData}
                        />
                    </EditableArea>
                </EditorBox>
                <EditableList
                    label='Переменные'
                    elementList={fieldList}
                    getLabel={getVariableName}
                    isChangeable={isVariableDeletable}
                    onElementClick={handleListElementClick}
                    onAdd={handleAddVariable}
                    onRename={handleRenameVariable}
                    onRemove={handleRemoveVariable}
                />
            </Slate>
        </TemplateEditorBox >
    );
});
