import { GridColDef, GridValueSetterParams } from "@mui/x-data-grid";
import { Variable } from "../../../utils/VariableList";

interface OnSetValueFunc {
    (rowId: number, value: string, field: string): void;
}

export function generateColumns(list: Variable[], onSet: OnSetValueFunc) {
    const columns: GridColDef[] = list.map((variable: Variable) => {
        return {
            editable: true,
            field: variable.name,
            valueSetter: (params: GridValueSetterParams) => {
                const row = {
                    ...params.row,
                    [variable.name]: params.value
                };

                onSet(params.row.id, params.value, variable.name);

                return row;
            }
        } as GridColDef;
    });

    return columns;
}