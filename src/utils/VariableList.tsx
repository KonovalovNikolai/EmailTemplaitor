interface VariableBase {
    name: string;
}

export interface DeletableVariable extends VariableBase {
    isDeletable: true;
};

export interface UnDeletableVariable extends VariableBase {
    isDeletable: false;
};

export interface EmailVariable extends UnDeletableVariable {
    isEmail: true;
}

export type Variable = DeletableVariable | UnDeletableVariable | EmailVariable;

export const initialVariableList: Variable[] = [
    {
        name: "Email",
        isDeletable: false,
        isEmail: true
    },
    {
        name: "City",
        isDeletable: true
    },
    {
        name: "Name",
        isDeletable: true
    },
    {
        name: "LastNameeeeeeeeeeeeee",
        isDeletable: true
    },
    {
        name: "Phone",
        isDeletable: true
    },
];

export function createDeletableVariable(name: string): DeletableVariable {
    return {
        name: name,
        isDeletable: true
    };
}

export function getVariableName(field: Variable) {
    return field.name;
}

export function isVariableDeletable(field: Variable) {
    return field.isDeletable;
}
export function filterVariableList(list: Variable[], filter: string) {
    return !filter ? list : list.filter(element => element.name.toLowerCase().startsWith(filter));
}

export function getVariableNameList(list: Variable[]) {
    return list.map<string>(element => element.name);
}

export function removeVariableFromList(list: Variable[], field: Variable) {
    return list.filter(e => e !== field);
}

export function renameVariableInList(list: Variable[], field: Variable, newField: Variable): Variable[] {
    const newList = [...list];

    const fieldIndex = newList.indexOf(field);
    if (fieldIndex === -1) {
        return newList;
    }

    const newFieldIndex = newList.indexOf(newField);
    if (newFieldIndex !== -1) {
        return newList;
    }

    newList[fieldIndex] = newField;

    return newList;
}

export function isVariableListContainName(list: Variable[], fieldName: string): boolean {
    return list.find(element => element.name.toLowerCase() === fieldName) !== undefined;
}