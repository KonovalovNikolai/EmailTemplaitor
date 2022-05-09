import { Field } from "./FieldList";

export interface Addressee {
    [fieldName: string]: string;
}

export function createAddressee(fieldList: Field[]) {
    const addressee: Addressee = {};
    fieldList.forEach(f => addressee[f.name] = "");
    return addressee;
}

function addAddresseeField(addressee: Addressee, field: string) {
    if (field in addressee) {
        return addressee;
    }

    addressee[field] = "";
    return {
        ...addressee,
        [field]: ""
    };
}

function removeAddresseeField(addressee: Addressee, field: string) {
    if (field in addressee) {
        delete addressee[field];
        return addressee;
    }

    return addressee;
}

function renameAddresseeField(addressee: Addressee, field: string, newField: string) {
    if (field in addressee && !(newField in addressee)) {
        addressee[newField] = addressee[field];
        delete addressee[field];
        return addressee;
    }

    return addressee;
}

export function addAddresseeFieldToList(addresseeList: Addressee[], field: Field) {
    return addresseeList.map(a => addAddresseeField(a, field.name));
}

export function removeAddresseeFieldFromList(addresseeList: Addressee[], field: Field) {
    return addresseeList.map(a => removeAddresseeField(a, field.name));
}

export function renameAddresseeFieldInList(addresseeList: Addressee[], field: Field, newField: Field) {
    return addresseeList.map(a => renameAddresseeField(a, field.name, newField.name));
}