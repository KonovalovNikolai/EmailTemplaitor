import { Descendant } from "slate";
import { Addressee } from "./Addressee";
import { initialValue } from "./initialDocument";
import { initialVariableList, Variable } from "./VariableList";

export function initDocument(path = null): [Descendant[], Variable[], Addressee[]] {
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

  // console.log(finaleJSON);

  // try {
  //   const documentJSON: string[] = JSON.parse(finaleJSON);
  //   const parsedDocument: Descendant[] = JSON.parse(documentJSON[0]);
  //   const parsedVariableList: Variable[] = JSON.parse(documentJSON[1]);
  //   const parsedAddresseeList: Addressee[] = JSON.parse(documentJSON[2]);

  //   console.log(parsedDocument);
  //   console.log(parsedVariableList);
  //   console.log(parsedAddresseeList);

  // } catch (error) {
  //   console.log(error);
  // }

  return finaleJSON;
}
