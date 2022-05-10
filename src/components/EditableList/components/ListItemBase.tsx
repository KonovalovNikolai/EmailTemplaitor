import { Chip, Grid, } from "@mui/material";
import { memo } from "react";
import { DeletableListItemProps, ListItemBaseProps, UndeletableListItemProps } from "../types";

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
    );
};

export const DeletableListItem = memo(({ element, onDelete, onClick }: DeletableListItemProps<any>) => {
    return (
        <ListItemBase
            label={element.name}
            color="default"
            onDelete={() => onDelete(element)}
            onClick={(event) => onClick(event, element)} />
    );
});

export const UndeletableListItem = memo(({ label }: UndeletableListItemProps) => {
    return (
        <ListItemBase label={label} color="primary" onClick={null} onDelete={null} />
    );
});
