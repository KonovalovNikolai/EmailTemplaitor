import { IconButton, IconButtonProps, styled } from "@mui/material";

interface TabIconButtonProps extends IconButtonProps {
    current?: boolean;
}

export const TabIconButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'current',
  })<TabIconButtonProps>(({ current, theme }) => ({
    padding: "0px",
    width: "60px",
    height: "60px",

    color: theme.palette.neutral.dark,

    ":hover": {
        color: theme.palette.primary.main,
    },

    ...(current && {
        color: theme.palette.primary.main,
    })
}));