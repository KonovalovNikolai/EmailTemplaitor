import { GridColDef, GridValueSetterParams } from "@mui/x-data-grid";
import { Field } from "../../../utils/FieldList";

interface ValueSetterFunc {
    (params: GridValueSetterParams): string;
}

export function generateColumns(list: Field[]) {
    const columns: GridColDef[] = list.map((field: Field) => {
        return {
            editable: true,
            field: field.name,
            valueSetter: (params: GridValueSetterParams) => {
                const row = {
                    ...params.row,
                };

                row[field.name] = params.value;

                return row;
            }
        } as GridColDef;
    });

    return columns;
}