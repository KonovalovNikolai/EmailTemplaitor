import { Chip } from "@mui/material"
import { on } from "events"
import React from "react"
import { ListElement } from "../../utils/FieldList"

type ListItemBaseProps = {
    label: string,
    color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    onDelete: () => any,
    onClick: (event: React.MouseEvent) => any
}

export const ListItemBase = ({ label, color, onDelete = null, onClick = null }: ListItemBaseProps, ...rest) => {
    return (
        <Chip
            sx={{
                m: "2px", width: "95px"
            }}
            color={color}
            label={label}
            onDelete={onDelete}
            onClick={onClick}
            {...rest}
        />
    )
}

type DeletableListItemProps = {
    label: string
    onDelete: () => void
    onClick: (event: React.MouseEvent) => any
}

export const DeletableListItem = ({ label, onDelete, onClick }: DeletableListItemProps) => {
    return (
        <ListItemBase label={label} color="default" onDelete={onDelete} onClick={onClick} />
    )
}

type UndeletableListItemProps = {
    label: string
}

export const UndeletableListItem = ({ label }: UndeletableListItemProps) => {
    return (
        <ListItemBase label={label} color="primary" onClick={null} onDelete={null} />
    )
}