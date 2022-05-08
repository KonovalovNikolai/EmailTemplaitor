import { memo } from "react";
import {
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface GridToolbarProps {
    onAdd: () => void;
}

const AddresseeGridToolbar = ({ onAdd }: GridToolbarProps) => {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <IconButton
                color="primary"
                onClick={onAdd}
            >
                <AddIcon />
            </IconButton>
        </GridToolbarContainer>
    );
};

export default memo(AddresseeGridToolbar);