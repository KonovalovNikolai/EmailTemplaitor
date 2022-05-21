import { ListItemIcon, ListItemIconProps, styled } from "@mui/material";

interface EditableListItemIcon extends ListItemIconProps {
    primary?: boolean;
}

export const EditableListItemIcon = styled(ListItemIcon, { 
    name: "VariableListItemIcon",
    shouldForwardProp: (prop) => prop !== 'primary',
})<EditableListItemIcon>(({ primary, theme }) => ({
    minWidth: 0,
    paddingRight: "5px",

    ...( primary && {
        color: theme.palette.primary.main,
    })
}));