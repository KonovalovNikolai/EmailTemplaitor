import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Box, IconButton } from "@mui/material";
import {
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    useGridApiContext
} from "@mui/x-data-grid";
import { memo } from "react";

interface GridToolbarProps {
    onAdd: () => any;
    onDelete: (ids: Set<number>) => void;
}

const AddresseeGridToolbar = ({ onAdd: onAdd, onDelete }: GridToolbarProps) => {
    const apiRef = useGridApiContext();

    return (
        <GridToolbarContainer>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Box>
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </Box>
                <Box>
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
                </Box>
            </Box>
        </GridToolbarContainer>
    );
};

export default memo(AddresseeGridToolbar);