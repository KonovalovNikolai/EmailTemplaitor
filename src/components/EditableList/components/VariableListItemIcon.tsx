import { ListItemIcon, ListItemIconProps, styled } from "@mui/material";

interface VariableListItemIconProps extends ListItemIconProps {
    primary?: boolean;
}

export const VariableListItemIcon = styled(ListItemIcon, { 
    name: "VariableListItemIcon",
    shouldForwardProp: (prop) => prop !== 'primary',
})<VariableListItemIconProps>(({ primary, theme }) => ({
    minWidth: 0,
    paddingRight: "5px",

    ...( primary && {
        color: theme.palette.primary.main,
    })
}));