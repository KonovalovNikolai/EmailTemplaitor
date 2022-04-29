import React, { useState } from 'react';
import { Descendant } from 'slate';
import CustomEditor from './components/Editor/CustomEditor';
import { FieldList } from './components/EditableList/utils/FieldList';

import { initialValue } from './components/Editor/utils/initialDocument';
import { SerializedDocument } from './components/SerializedDocument';

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
    {
      name: "1",
      isDeletable: true
    },
    {
      name: "2",
      isDeletable: true
    },
    {
      name: "3",
      isDeletable: true
    },
    {
      name: "4",
      isDeletable: true
    },
    {
      name: "5",
      isDeletable: true
    },
    {
      name: "7",
      isDeletable: true
    },
    {
      name: "8",
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
      {/* <SerializedDocument nodes={value}/> */}
    </div>
  );
}

export default App;
