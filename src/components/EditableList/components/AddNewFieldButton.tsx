import { IconButton } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Field } from "../../../utils/FieldList";
import { memo } from "react";

type Props = {
    onClick: (event: React.MouseEvent, element: Field) => void
}

const NewFieldButton = ({onClick}: Props) => {
    return (
        <IconButton size='small'
            onClick={
                (event) => {
                    onClick(event, { name: "", isDeletable: true })
                }
            }
        >
            <AddCircleIcon color='primary' />
        </IconButton>
    )
}

export default memo(NewFieldButton)