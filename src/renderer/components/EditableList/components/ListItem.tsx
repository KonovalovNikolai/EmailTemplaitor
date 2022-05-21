import { IconButton, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { memo } from "react";
import { DeletableListItemProps, ListItemBaseProps, UndeletableListItemProps } from "../types";
import { EditableListItemIcon } from "./EditableListItemIcon";
import CloseIcon from '@mui/icons-material/Close';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { styled } from "@mui/material/styles";

const ElementListItemButton = styled(ListItemButton, { name: "ElementListItemButton" })(({ theme }) => ({
    paddingLeft: "10px",
    paddingRight: "70px!important",
    paddingTop: 0,
    paddingBottom: 0,
}));

const ElementLabel = styled(Typography, { name: "ElementLabel" })(({
    fontWeight: "300",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
}));

export const DeletableListItem = memo(({ element, label, onElementClick, onDelete, onRename: onClick }: DeletableListItemProps<any>) => {
    return (
        <ListItem
            secondaryAction={
                <>
                    <IconButton edge="end" size="small"
                        onClick={(e) => onClick(e, element)}
                    >
                        <EditSharpIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                    <IconButton edge="end" size="small"
                        onClick={() => onDelete(element)}
                    >
                        <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                </>
            }
            disablePadding
        >
            <ElementListItemButton
                onClick={(e) => {
                    e.preventDefault();
                    onElementClick(element);
                }}
            >
                <EditableListItemIcon>
                    <Typography>#</Typography>
                </EditableListItemIcon>
                <ListItemText
                    primary={
                        <ElementLabel>
                            {label}
                        </ElementLabel>
                    }
                />
            </ElementListItemButton>
        </ListItem >
    );
});

export const UndeletableListItem = memo(({ label, element, onElementClick }: UndeletableListItemProps<any>) => {
    return (
        <ListItem disablePadding>
            <ElementListItemButton
                onClick={(e) => {
                    e.preventDefault();
                    onElementClick(element);
                }}
            >
                <EditableListItemIcon primary>
                    <Typography>#</Typography>
                </EditableListItemIcon>
                <ListItemText
                    primary={
                        <ElementLabel>
                            {label}
                        </ElementLabel>
                    }
                />
            </ElementListItemButton>
        </ListItem>
    );
});
