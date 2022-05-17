import { GridColDef, GridValueSetterParams } from "@mui/x-data-grid";
import { Variable } from "../../../utils/VariableList";

interface OnSetValueFunc {
    (rowId: number, value: string, field: string): void;
}

export function generateColumns(list: Variable[], onSet: OnSetValueFunc) {
    const columns: GridColDef[] = list.map((field: Variable) => {
        return {
            editable: true,
            field: field.name,
            valueSetter: (params: GridValueSetterParams) => {
                const row = {
                    ...params.row,
                    [field.name]: params.value
                };

                onSet(params.row.id, params.value, field.name);

                return row;
            }
        } as GridColDef;
    });

    return columns;
}