import { styled } from "@mui/system";


export const TabButtonsContainer = styled("div", { name: "TabButtonsContainer" })(({ theme }) => ({
    paddingTop: "10px",

    width: "fit-content",

    display: "flex",
    flexDirection: "column",

    backgroundColor: theme.palette.neutral.main,
}));
