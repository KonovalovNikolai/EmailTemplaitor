import { Field } from "../../../utils/FieldList";

export function generateColumns(list: Field[]) {
    const columns = list.map((field: Field) => {
        return {
            field: field.name
        };
    });

    return columns;
}