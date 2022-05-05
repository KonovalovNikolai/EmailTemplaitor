import { DataGrid, GridActionsCellItem, GridColumns, GridRowId, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import React, { useMemo } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { Addressee } from '../utils/Addressee';
import { AddAddresseeAction, IFieldsReducerAction, RemoveAddresseeAction } from '../hooks/FieldListReducer';
import { Field, getFieldNameList } from '../utils/FieldList';

type DataGridTestProps = {
    fieldList: Field[];
    addresseeList: Addressee[];
    onChange: React.Dispatch<IFieldsReducerAction>;
};

function generateColumns(list: Field[]) {
    const actionColum = {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => {
                    console.log(params);
                }}
            />
        ]
    };

    const columns: GridColumns = list.map((field: Field) => {
        return {
            field: field.name,
        };
    });

    columns.push(actionColum);

    return columns;
}

function generateRows(list: Addressee[]) {
    return list.map((addressee: Addressee, index: number) => {
        return {
            id: index,
            ...addressee
        };
    }) as GridRowsProp;
}

const DataGridTest = ({ fieldList, addresseeList, onChange }: DataGridTestProps) => {
    const columns = useMemo(
        () => generateColumns(fieldList),
        [fieldList]
    );

    // const handleDelete = (id: GridRowId) => {
    //     const action = new RemoveAddresseeAction(id as number);
    //     onChange(action);
    // };

    const gridRows: GridRowsProp = generateRows(addresseeList);

    const handleAddRow = () => {
        const action = new AddAddresseeAction();
        onChange(action);
    };

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <Button size="small" onClick={handleAddRow}>
                Add a row
            </Button>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    rows={gridRows}
                    columns={columns}
                    components={{
                        Toolbar: GridToolbar
                    }} />
            </div>
        </div>
    );
};

export default DataGridTest;