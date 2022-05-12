import { styled } from "@mui/system";

export const AppContainer = styled("div", { name: "AppContainer" })({
    fontFamily: 'Roboto, sans-serif',
    display: 'flex',
    padding: "10px 10px 10px 10px",
    width: "900px",
    height: "500px",
    borderRadius: "1%",
});

export const TabButtonsContainer = styled("div", { name: "TabButtonsContainer" })({
    display: "flex",
    flexDirection: "column",
});

export const ContentContainer = styled("div", { name: "ContentContainer" })({
    flex: "auto",
});

export const EditorContainer = styled("div", { name: "EditorContainer" })({
    display: "flex",
    height: "100%",

    boxSizing: "border-box",
    border: "1px solid rgba(224, 224, 224, 1)",
    borderRadius: "4px",

    padding: "4px"
});

export const EditorContainerEditableArea = styled("div", { name: "EditorContainerEditableArea" })({
    width: "70%",
    paddingRight: "5px",
    "& .editable-container": {
        overflowY: "scroll",
        height: "-webkit-fill-available",
    },

    "& .editable": {
        paddingRight: "5px",
        lineHeight: "1.4",

        "& p": {
            margin: 0
        },

        "&.editable > * + *": {
            marginTop: "1em",
        }
    },
});

export const EditorContainerToolbar = styled("div", { name: "EditorContainerToolbar" })({
    display: "flex",
    flexDirection: "column",
    width: "30%",
    paddingLeft: "5px",

    "& .slate-toolbar": {
        height: "22%",
    },

    "& .editable-list": {
        height: "75%",
        marginTop: "auto",
    },
});