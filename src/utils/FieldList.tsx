interface FieldBase {
    name: string;
}

export interface DeletableField extends FieldBase {
    isDeletable: true;
};

export interface UnDeletableField extends FieldBase {
    isDeletable: false;
};

export interface EmailField extends UnDeletableField {
    isEmail: true;
}

export type Field = DeletableField | UnDeletableField | EmailField;

export const initialFieldList: Field[] = [
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
        name: "LastName",
        isDeletable: true
    },
    {
        name: "Phone",
        isDeletable: true
    },
];

export function filterFieldList(list: Field[], filter: string) {
    return !filter ? list : list.filter(element => element.name.toLowerCase().startsWith(filter));
}

export function getFieldNameList(list: Field[]) {
    return list.map<string>(element => element.name);
}

export function removeFieldFromList(list: Field[], field: Field) {
    return list.filter(e => e !== field);
}

export function renameFieldInList(list: Field[], field: Field): Field[] {
    const index = list.indexOf(field);

    if (!list[index].isDeletable) {
        return list;
    }

    list[index] = field;
    return list;
}

export function isFieldListContainName(list: Field[], fieldName: string): boolean {
    return list.find(element => element.name.toLowerCase() === fieldName) !== undefined;
}