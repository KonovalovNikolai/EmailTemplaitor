import { styled } from "@mui/system";

export const EditableContainer = styled("div")({
    overflowY: "scroll",
    height: "-webkit-fill-available",
    "& .editable": {
        paddingRight: "10px"
    }
});

export const EditorContainer = styled("div")({
    display: "flex",
    height: "100%",
    "& .left-side": {
        width: "70%",
        paddingRight: "10px",
    },
    "& .right-side": {
        width: "30%",
        paddingLeft: "10px",
    },
    "& .slate-toolbar": {
        height: "30%",
    },
    "& .editable-list": {
        height: "70%",
    },
})