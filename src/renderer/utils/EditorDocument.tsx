
import { Variable } from "./VariableList";
import { Descendant } from "slate";
import { Addressee } from "./Addressee";

type EditorDocument =  [Descendant[], Variable[], Addressee[]];

export default EditorDocument;
