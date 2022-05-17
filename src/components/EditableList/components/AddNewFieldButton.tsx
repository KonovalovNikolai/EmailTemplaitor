import { IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { memo } from "react";
import { NewElementButtonProps } from "../types";

const NewFieldButton = ({ onRename: onClick }: NewElementButtonProps<any>) => {
    return (
        <IconButton size='small'
            onClick={(event) => { onClick(event, null); }}
        >
            <AddCircleIcon color='primary' />
        </IconButton>
    );
};

export default memo(NewFieldButton);