import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { memo, useCallback, useMemo, useState } from "react";

import AddresseeGridToolbar from "./AddresseeGridToolbar";

import { generateColumns } from "../utils/generateColumns";
import { generateRows } from "../utils/generateRows";

import { Addressee } from "../../../utils/Addressee";

import {
    AddAddresseeAction,
    DeleteAddresseeAction, SetAddresseeValueAction
} from "../../../hooks/VariableListReducer";

import { AddresseeGridProps } from "../types";
import { styled } from '@mui/material/styles';
import { ModalPreview } from "./ModalPreview";

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

export const AddresseeGrid = memo(({ variableList, addresseeList, onChange, onPreview }: AddresseeGridProps) => {
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

    const handleSetPreview = useCallback(
        (id: number) => {
            if (id >= 0 && id < addresseeList.length) {
                setAddresseePreview(addresseeList[id]);
            }
        },
        []
    );

    const toolBar = () => {
        return (
            <AddresseeGridToolbar
                onAdd={handleAddRow}
                onDelete={handleDeleteRow}
                onPreview={handleSetPreview}
            />
        );
    };

    const [addresseePreview, setAddresseePreview] = useState<Addressee | null>(null);

    const handleClosePreview = useCallback(
        () => {
            setAddresseePreview(null);
        },
        []
    );

    let isOpen = !!addresseePreview;
    let preview = <></>;
    if (isOpen) {
        preview = onPreview(addresseePreview);
    }

    return (
        <>
            <GridBox>
                <AddresseeStyledGrid
                    rows={gridRows}
                    columns={columns}
                    components={{
                        Toolbar: toolBar
                    }}
                />
            </GridBox>
            <ModalPreview isOpen={isOpen} onClose={handleClosePreview}>
                {preview}
            </ModalPreview>
        </>
    );
});
