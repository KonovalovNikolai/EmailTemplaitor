import { memo } from "react";
import {
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    useGridApiContext
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { AddAddresseeAction, IFieldsReducerAction } from "../../../../hooks/FieldListReducer";

interface GridToolbarProps {
    onChange: React.Dispatch<IFieldsReducerAction>;
}

const AddresseeGridToolbar = ({ onChange: onAdd }: GridToolbarProps) => {
    const apiRef = useGridApiContext();

    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <IconButton
                color="primary"
                onClick={() => {
                    const action = new AddAddresseeAction(false);
                    onAdd(action);
                    apiRef.current.updateRows([{
                        id: action.newAddresseeIndex,
                        ...action.newAddressee
                    }]);
                }}
            >
                <AddIcon />
            </IconButton>
        </GridToolbarContainer>
    );
};

export default memo(AddresseeGridToolbar);