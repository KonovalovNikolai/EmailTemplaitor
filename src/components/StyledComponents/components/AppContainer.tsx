import { styled } from '@mui/material/styles';

export const AppContainer = styled("div", { name: "AppContainer" })(({theme}) => ({
    display: 'flex',
    width: "900px",
    height: "500px",

    backgroundColor: theme.palette.background.default,
}));
