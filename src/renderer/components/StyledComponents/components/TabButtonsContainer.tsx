import { styled } from '@mui/material/styles';


export const TabButtonsContainer = styled("div", { name: "TabButtonsContainer" })(({ theme }) => ({
    paddingTop: "10px",

    width: "fit-content",

    display: "flex",
    flexDirection: "column",

    backgroundColor: theme.palette.grey[900],
}));
