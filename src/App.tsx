import React, { useState } from 'react';
import { Descendant, Editor } from 'slate';
import { EditableList } from './components/EditableList/EditableList';
import CustomEditor from './components/Editor/CustomEditor';
import { FieldList } from './components/EditableList/utils/FieldList';

import { initialValue } from './components/Editor/utils/initialDocument';

function App() {
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const [list, setList] = useState<FieldList>(new FieldList([
    {
      name: "City",
      isDeletable: true
    },
    {
      name: "Name",
      isDeletable: true
    },
    {
      name: "LastName",
      isDeletable: true
    },
    {
      name: "Phone",
      isDeletable: true
    },
  ]))

  return (
    <div>
      <CustomEditor
        value={value}
        list={list}
        onChange={setValue}
        onListChange={setList}
      />
    </div>
  );
}

export default App;
