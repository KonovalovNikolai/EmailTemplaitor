import React, { useState } from 'react';
import { Descendant, Editor } from 'slate';
import { DeletableListElement, EditableList, ListElement } from './components/EditableList/EditableList';
import CustomEditor from './components/Editor/CustomEditor';

import { initialValue } from './utils/initialDocument';

function App() {
  // const [value, setValue] = useState<Descendant[]>(initialValue)

  // return (
  //   <div>
  //     <CustomEditor value={value} onChange={setValue}/>
  //   </div>
  // );

  const [list, setList] = useState<ListElement[]>([
    {
      name: "Email",
      isDeletable: false
    },
    {
      name: "City",
      isDeletable: true
    },
    {
      name: "Phone Number",
      isDeletable: true
    },
  ])

  return (
    <div>
      <EditableList
        list={list}
        onChange={
          (list: ListElement[]) => {
            setList(list)
          }
        }
      />
    </div>
  )
}

export default App;
