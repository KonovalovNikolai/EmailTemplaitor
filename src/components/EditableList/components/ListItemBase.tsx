import { IconButton, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { memo } from "react";
import { DeletableListItemProps, ListItemBaseProps, UndeletableListItemProps } from "../types";
import { VariableListItemIcon } from "./VariableListItemIcon";
import CloseIcon from '@mui/icons-material/Close';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { styled } from "@mui/system";

const VariableListItemButton = styled(ListItemButton, { name: "VariableListItemButton" })(({ theme }) => ({
    paddingLeft: "10px",
    paddingRight: "70px!important",
}));

export const DeletableListItem = memo(({ element, label, onDelete, onClick }: DeletableListItemProps<any>) => {
    return (
        <ListItem
            secondaryAction={
                <>
                    <IconButton edge="end" size="small">
                        <EditSharpIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                    <IconButton edge="end" size="small">
                        <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                </>
            }
            disablePadding
        >
            <VariableListItemButton>
                <VariableListItemIcon>
                    <Typography>#</Typography>
                </VariableListItemIcon>
                <ListItemText
                    primary={
                        <Typography
                            fontWeight="light"
                            overflow="hidden"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                        >
                            {label}
                        </Typography>
                    }
                />
            </VariableListItemButton>
        </ListItem >
    );
});

export const UndeletableListItem = memo(({ label }: UndeletableListItemProps) => {
    return (
        <ListItem disablePadding>
            <VariableListItemButton>
                <VariableListItemIcon primary>
                    <Typography>#</Typography>
                </VariableListItemIcon>
                <ListItemText
                    primary={
                        <Typography
                            fontWeight="light"
                            overflow="hidden"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                        >
                            {label}
                        </Typography>
                    }
                />
            </VariableListItemButton>
        </ListItem>
    );
});
