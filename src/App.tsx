import React, { useState } from 'react';
import { Descendant, Editor } from 'slate';
import { EditableList } from './components/EditableList/EditableList';
import CustomEditor from './components/Editor/CustomEditor';
import { FieldList } from './utils/FieldList';

import { initialValue } from './utils/initialDocument';

function App() {
  // const [value, setValue] = useState<Descendant[]>(initialValue)

  // return (
  //   <div>
  //     <CustomEditor value={value} onChange={setValue}/>
  //   </div>
  // );

  const [list, setList] = useState<FieldList>(new FieldList([
    {
      name: "City",
      isDeletable: true
    },
    {
      name: "Name",
      isDeletable: true
    },
  ]))

  return (
    <div>
      <EditableList
        fieldList={list}
        onChange={
          (newList: FieldList) => {
            setList(newList)
          }
        }
      />
    </div>
  )
}

export default App;
