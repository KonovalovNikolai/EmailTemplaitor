import React, { useState } from 'react';
import { Descendant, Editor } from 'slate';
import { EditableList } from './components/EditableList/EditableList';
import CustomEditor from './components/Editor/CustomEditor';
import { FieldList } from './utils/FieldList';

import { initialValue } from './utils/initialDocument';

function App() {
  const [value, setValue] = useState<Descendant[]>(initialValue)

  return (
    <div>
      <CustomEditor value={value} onChange={setValue}/>
    </div>
  );

  // const [list, setList] = useState<FieldList>(new FieldList([
  //   {
  //     name: "City",
  //     isDeletable: true
  //   },
  //   {
  //     name: "Name",
  //     isDeletable: true
  //   },
  //   {
  //     name: "LastName",
  //     isDeletable: true
  //   },
  //   {
  //     name: "Phone",
  //     isDeletable: true
  //   },
  // ]))

  // return (
  //   <EditableList
  //     fieldList={list}
  //     onChange={setList}
  //   />
  // )
}

export default App;
