import React, { useState } from 'react';
import { Descendant, Editor } from 'slate';
import CustomEditor from './components/Editor/CustomEditor';

import { initialValue } from './utils/initialDocument';

function App() {
  const [value, setValue] = useState<Descendant[]>(initialValue)
  
  return (
    <div>
      <CustomEditor value={value} onChange={setValue}/>
    </div>
  );
}

export default App;
