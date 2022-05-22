import { Descendant } from "slate";
import { Addressee } from "./Addressee";
import { initialValue } from "./initialDocument";
import { initialVariableList, Variable } from "./VariableList";

export function initDocument(path = null): [Descendant[], Variable[], Addressee[]] {
  return [initialValue, initialVariableList, []];
}
