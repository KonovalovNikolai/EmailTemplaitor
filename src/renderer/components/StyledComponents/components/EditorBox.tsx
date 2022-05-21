import { styled } from '@mui/material/styles';


export const EditorBox = styled("div", { name: "EditorBox" })(({theme}) => ({
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "flex-start",

    width: "100%",
    height: "100%",

    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderColor: theme.palette.divider,

    // "flex": "none",
    // "alignSelf": "stretch",
    // "flexGrow": "1"
}));
