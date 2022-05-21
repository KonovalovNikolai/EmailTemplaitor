import { Variable } from "./VariableList";

export interface Addressee {
    [variableName: string]: string;
}

export function createAddressee(variableList: Variable[]) {
    const addressee: Addressee = {};
    variableList.forEach(f => addressee[f.name] = "");
    return addressee;
}

function addAddresseeVariable(addressee: Addressee, variable: string) {
    if (variable in addressee) {
        return addressee;
    }

    addressee[variable] = "";
    return {
        ...addressee,
        [variable]: ""
    };
}

function removeAddresseeVariable(addressee: Addressee, variable: string) {
    if (variable in addressee) {
        delete addressee[variable];
        return addressee;
    }

    return addressee;
}

function renameAddresseeVariable(addressee: Addressee, variable: string, newVariable: string) {
    if (variable in addressee && !(newVariable in addressee)) {
        addressee[newVariable] = addressee[variable];
        delete addressee[variable];
        return addressee;
    }

    return addressee;
}

export function addAddresseeVariableToList(addresseeList: Addressee[], variable: Variable) {
    return addresseeList.map(a => addAddresseeVariable(a, variable.name));
}

export function removeAddresseeVariableFromList(addresseeList: Addressee[], variable: Variable) {
    return addresseeList.map(a => removeAddresseeVariable(a, variable.name));
}

export function renameAddresseeVariableInList(addresseeList: Addressee[], variable: Variable, newVariable: Variable) {
    return addresseeList.map(a => renameAddresseeVariable(a, variable.name, newVariable.name));
}