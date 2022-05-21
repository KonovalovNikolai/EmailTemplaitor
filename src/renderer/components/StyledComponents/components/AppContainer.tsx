import { styled } from '@mui/material/styles';

export const AppContainer = styled("div", { name: "AppContainer" })(({theme}) => ({
    display: 'flex',
    width: "100%",
    height: "100%",

    backgroundColor: theme.palette.background.default,
}));
