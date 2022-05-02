import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { FieldList } from '../utils/FieldList';

type DataGridTestProps = {
    fieldList: FieldList
}

const DataGridTest = ({fieldList}: DataGridTestProps) => {
    const columns: GridColDef[] = fieldList.GetListOfNames("").map((name: string) => {
        return {
            field: name
        }
    })
    
    const addressees = fieldList.GetAddressees().GetAddressees();
    let rows = [];
    for (let id in addressees) {
        rows.push({
            id: id,
            ...addressees[id]
        })
    }

    const gridRows: GridRowsProp = rows;

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid rows={gridRows} columns={columns} />
            </div>
        </div>
    );
};

export default DataGridTest;