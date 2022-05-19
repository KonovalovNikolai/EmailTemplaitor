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

export function getVariableName(variable: Variable) {
    return variable.name;
}

export function isVariableDeletable(variable: Variable) {
    return variable.isDeletable;
}
export function filterVariableList(list: Variable[], filter: string) {
    return !filter ? list : list.filter(element => element.name.toLowerCase().startsWith(filter));
}

export function getVariableNameList(list: Variable[]) {
    return list.map<string>(element => element.name);
}

export function removeVariableFromList(list: Variable[], variable: Variable) {
    return list.filter(e => e !== variable);
}

export function renameVariableInList(list: Variable[], variable: Variable, newVariable: Variable): Variable[] {
    const newList = [...list];

    const variableIndex = newList.indexOf(variable);
    if (variableIndex === -1) {
        return newList;
    }

    const newVariableIndex = newList.indexOf(newVariable);
    if (newVariableIndex !== -1) {
        return newList;
    }

    newList[variableIndex] = newVariable;

    return newList;
}

export function isVariableListContainName(list: Variable[], variableName: string): boolean {
    return list.find(element => element.name.toLowerCase() === variableName) !== undefined;
}