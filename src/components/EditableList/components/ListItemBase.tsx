import { Chip, Grid } from "@mui/material"
import { on } from "events"
import React, { memo } from "react"
import { ListElement } from "../utils/FieldList"

type ListItemBaseProps = {
    label: string,
    color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    onDelete: () => any,
    onClick: (event: React.MouseEvent) => any
}

export const ListItemBase = ({ label, color, onDelete = null, onClick = null }: ListItemBaseProps, ...rest) => {
    return (
        <Grid item xs={6}>
            <Chip
                sx={{
                    width: 1,
                    "&>.MuiChip-label": {
                        margin: "auto",
                        flex: "auto"
                    }
                }}
                color={color}
                label={`#${label}`}
                onDelete={onDelete}
                onClick={onClick}
                {...rest}
            />
        </Grid>
    )
}

type DeletableListItemProps = {
    element: ListElement
    onDelete: (element: ListElement) => void
    onClick: (event: React.MouseEvent, element: ListElement) => any
}

export const DeletableListItem = memo(({ element, onDelete, onClick }: DeletableListItemProps) => {


    return (
        <ListItemBase
            label={element.name}
            color="default"
            onDelete={() => onDelete(element)}
            onClick={(event) => onClick(event, element)} />
    )
})

type UndeletableListItemProps = {
    label: string
}

export const UndeletableListItem = memo(({ label }: UndeletableListItemProps) => {
    return (
        <ListItemBase label={label} color="primary" onClick={null} onDelete={null} />
    )
})
