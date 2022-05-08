
import { Add } from "@mui/icons-material";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { memo, useCallback, useMemo } from "react";
import { AddAddresseeAction, IFieldsReducerAction } from "../../hooks/FieldListReducer";
import { Addressee } from "../../utils/Addressee";
import { Field } from "../../utils/FieldList";
import AddresseeGridToolbar from "./utils/components/AddresseeGridToolbar";
import { generateColumns } from "./utils/generateColumns";
import { generateRows } from "./utils/generateRows";

type AddresseeGridProps = {
    fieldList: Field[];
    addresseeList: Addressee[];
    onChange: React.Dispatch<IFieldsReducerAction>;
};

const AddresseeGrid = ({ fieldList, addresseeList, onChange }: AddresseeGridProps) => {
    const columns = useMemo(
        () => generateColumns(fieldList),
        [fieldList]
    );

    const gridRows = useMemo(
        () => generateRows(addresseeList),
        [addresseeList]
    );

    const handleAdd = useCallback(
        () => {
            const action = new AddAddresseeAction();
            onChange(action);
        },
        []
    );

    const toolBar = () => {
        return (
            <AddresseeGridToolbar
                onAdd={handleAdd}
            />
        );
    };

    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    rows={gridRows}
                    columns={columns}
                    components={{
                        Toolbar: toolBar
                    }}
                />
            </div>
        </div>
    );
};

export default memo(AddresseeGrid);