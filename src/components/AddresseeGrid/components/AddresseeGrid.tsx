import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { memo, useCallback, useMemo } from "react";

import AddresseeGridToolbar from "./AddresseeGridToolbar";

import { generateColumns } from "../utils/generateColumns";
import { generateRows } from "../utils/generateRows";

import {
    AddAddresseeAction,
    DeleteAddresseeAction, SetAddresseeValueAction
} from "../../../hooks/VariableListReducer";

import { AddresseeGridProps } from "../types";
import { styled } from '@mui/material/styles';

const GridBox = styled("div", { name: "GridBox" })({
    display: 'flex',
    height: '100%',
    width: '100%',

    flexDirection: 'column'
});

const AddresseeStyledGrid = styled(DataGrid, { name: "AddresseeStyledGrid" })<DataGridProps>(({ theme }) => ({
    border: "none",

    "& .MuiDataGrid-virtualScroller": {
        overflow: "overlay",

        "::-webkit-scrollbar": {
            width: "11px",
            height: "11px",
        },

        "::-webkit-scrollbar-track": {
            background: "transparent",
        },

        "::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.divider,
        },  

        "::-webkit-scrollbar-corner": {
            background: "transparent",
        }
    },
}));

export const AddresseeGrid = memo(({ variableList, addresseeList, onChange }: AddresseeGridProps) => {
    const columns = useMemo(
        () => generateColumns(
            variableList,
            (id, value, variable) => {
                const action = new SetAddresseeValueAction(id, variable, value);
                onChange(action);
            }
        ),
        [variableList]
    );

    const gridRows = useMemo(
        () => generateRows(addresseeList),
        [addresseeList]
    );

    const handleAddRow = useCallback(
        () => {
            const action = new AddAddresseeAction(false);
            onChange(action);
            return {
                id: action.newAddresseeIndex,
                ...action.newAddressee
            };
        },
        []
    );

    const handleDeleteRow = useCallback(
        (ids: Set<number>) => {
            const action = new DeleteAddresseeAction(ids, true);
            onChange(action);
        },
        []
    );

    const toolBar = () => {
        return (
            <AddresseeGridToolbar
                onAdd={handleAddRow}
                onDelete={handleDeleteRow}
            />
        );
    };

    return (
        <GridBox style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
            <AddresseeStyledGrid
                rows={gridRows}
                columns={columns}
                components={{
                    Toolbar: toolBar
                }}
            />
        </GridBox>
    );
});