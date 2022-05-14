import { Box, IconButton } from "@mui/material";
import { memo } from "react";

import {
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    useGridApiContext
} from "@mui/x-data-grid";

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { GridToolbarProps } from "../types";
import { styled } from "@mui/system";

const ToolBarContainer = styled("div", { name: "ToolBarContainer" })({
    display: "flex",
    flex: "auto",
    alignItems: "center",
});

const ToolBarLeftSideContainer = styled("div", { name: "ToolBarLeftSideContainer" })({
    marginLeft: "auto",
})

const AddresseeGridToolbar = ({ onAdd: onAdd, onDelete }: GridToolbarProps) => {
    const apiRef = useGridApiContext();

    return (
        <GridToolbarContainer>
            <ToolBarContainer>
                <div>
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </div>
                <ToolBarLeftSideContainer>
                    <IconButton
                        color="primary"
                        onClick={() => {
                            apiRef.current.updateRows([{
                                ...onAdd()
                            }]);
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={() => {
                            const selectedRows = apiRef.current.getSelectedRows();
                            const ids = new Set(Array.from(selectedRows.keys()) as number[]);

                            onDelete(ids);
                        }}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                </ToolBarLeftSideContainer>
            </ToolBarContainer>
        </GridToolbarContainer>
    );
};

export default memo(AddresseeGridToolbar);