import { DataGrid } from "@mui/x-data-grid";
import { memo, useMemo } from "react";
import { IFieldsReducerAction, SetAddresseeValueAction } from "../../hooks/FieldListReducer";
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
        () => generateColumns(
            fieldList,
            (id, value, field) => {
                const action = new SetAddresseeValueAction(id, field, value);
                onChange(action);
            }
        ),
        [fieldList]
    );

    const gridRows = useMemo(
        () => generateRows(addresseeList),
        [addresseeList]
    );

    const toolBar = () => {
        return (
            <AddresseeGridToolbar
                onChange={onChange}
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