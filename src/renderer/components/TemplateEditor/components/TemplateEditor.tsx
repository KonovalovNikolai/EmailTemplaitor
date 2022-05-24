import { memo, useCallback, useMemo, useState } from 'react';
import {
  createEditor,
  Descendant
} from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import { AddVariableAction, DeleteVariableAction, IDocumentReducerAction, RenameVariableAction, SetDocumentAction } from '../../../hooks/DocumentReducer';
import { createDeletableVariable, getVariableName, getVariableNameList, isVariableDeletable, Variable } from '../../../utils/VariableList';
import { AutoCompleteData, CustomSlateEditor, insertVariable, removeVariables, renameVariables } from '../../CustomSlateEditor';
import { SlateToolBar } from '../../CustomSlateEditor/components/Toolbar/Toolbar';
import { withVariable } from '../../CustomSlateEditor/plugins/withVariables';
import { EditableList } from '../../EditableList';
import { EditorBox, TemplateEditorBox } from '../../StyledComponents';
import { EditableArea } from '../../StyledComponents/components/EditableArea';
import { getAutoCompleteData, getBoundingClientRectFromRange } from '../utils';




interface TemplateEditorProps {
  documentValue: Descendant[];
  variableList: Variable[];
  onDocumentChange: React.Dispatch<IDocumentReducerAction>;
}

export const TemplateEditor = memo(({ documentValue, variableList, onDocumentChange }: TemplateEditorProps) => {
  // Инициализация редактора
  const editor = useMemo(
    () => withVariable(withReact(withHistory(createEditor()))),
    // () => withVariable(withReact(createEditor())),
    []
  );

  const handleAddVariable = useCallback(
    (newVariableName: string) => {
      const newVariable = createDeletableVariable(newVariableName);
      const action = new AddVariableAction(newVariable);
      onDocumentChange(action);
    },
    []
  );

  const handleRenameVariable = useCallback(
    (variable: Variable, newName: string) => {
      const newVariable = createDeletableVariable(newName);
      const action = new RenameVariableAction(variable, newVariable);
      onDocumentChange(action);

      renameVariables(editor, variable.name, newName);
    },
    []
  );

  const handleRemoveVariable = useCallback(
    (variable: Variable) => {
      const action = new DeleteVariableAction(variable);
      onDocumentChange(action);

      removeVariables(editor, variable.name);
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

  const autoCompleteList = getVariableNameList(variableList);

  const handleChange = useCallback(
    (value: Descendant[]) => {
      const isAstChange = editor.operations.some(
        op => 'set_selection' !== op.type
      );

      if (isAstChange) {
        const action = new SetDocumentAction(value, false);
        onDocumentChange(action);
      }

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
      <Slate editor={editor} value={documentValue} onChange={handleChange}>
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
          elementList={variableList}
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
