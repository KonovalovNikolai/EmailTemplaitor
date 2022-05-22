import { useState } from "react";
import { EmailTemplater } from "./components/EmailTemplater";

import './App.css';

function App() {
  const [documentPath, setPath] = useState<string>(null);

  return (
    <EmailTemplater path={documentPath}/>
  );
}

export default App;
