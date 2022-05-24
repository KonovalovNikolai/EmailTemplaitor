import { Descendant } from "slate";
import EditorDocument from "./EditorDocument"
import { Addressee } from "./Addressee";
import { initialValue } from "./initialDocument";
import { initialVariableList, Variable } from "./VariableList";

export function initDocument(): [Descendant[], Variable[], Addressee[]] {
  return [initialValue, initialVariableList, []];
}

export function selectSavePath() {
  window.electron.ipcRenderer.once("saveFile", (arg) => {
    console.log(arg);
  });
  window.electron.ipcRenderer.sendMessage("saveFile", []);
}

export function documentToJson(document: Descendant[], variableList: Variable[], addresseeList: Addressee[]) {
  const jsonStringArray = [JSON.stringify(document), JSON.stringify(variableList), JSON.stringify(addresseeList)];
  const finaleJSON = JSON.stringify(jsonStringArray);

  return finaleJSON;
}


export function JsonToDocument(JSONDocument: string): EditorDocument {
  let parsedDocument: Descendant[];
  let parsedVariableList: Variable[];
  let parsedAddresseeList: Addressee[];

  try {
    const documentJSON = JSON.parse(JSONDocument);
    parsedDocument = JSON.parse(documentJSON[0]);
    parsedVariableList = JSON.parse(documentJSON[1]);
    parsedAddresseeList = JSON.parse(documentJSON[2]);
  } catch (error) {
    throw error;
  }

  return [parsedDocument, parsedVariableList, parsedAddresseeList];
}
