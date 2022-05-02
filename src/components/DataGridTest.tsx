import React from 'react';
import { DataGrid, GridRowsProp, GridRowId, GridToolbar, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import { FieldList } from '../utils/FieldList';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { AppDataController } from '../utils/AppDataController';

type DataGridTestProps = {
    appData: AppDataController;
    onDataChange: React.Dispatch<React.SetStateAction<AppDataController>>;
};

const DataGridTest = ({ appData, onDataChange }: DataGridTestProps) => {
    const columns: GridColumns = appData.GetFieldList().GetListOfNames("").map((name: string) => {
        return {
            field: name
        };
    });

    const handleDelete = (id: GridRowId) => {
        onDataChange(data => {
            data.GetAddressees().Remove(id as number);
            return data.CreateNew();
        });
    };

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
                }
                }
            />
        ]
    };

    columns.push(actionColum);

    const addressees = appData.GetAddressees().GetAddressees();
    let rows = [];
    for (let id in addressees) {
        rows.push({
            id: id,
            ...addressees[id]
        });
    }

    const gridRows: GridRowsProp = rows;

    const handleAddRow = () => {
        onDataChange(data => {
            data.AddAddressee();
            return data.CreateNew();
        });
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