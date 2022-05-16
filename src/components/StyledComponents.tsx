import { styled } from "@mui/system";

export const AppContainer = styled("div", { name: "AppContainer" })({
    // fontFamily: 'Roboto, sans-serif',
    display: 'flex',
    width: "900px",
    height: "500px",
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
});

export const EditorContainerEditableArea = styled("div", { name: "EditorContainerEditableArea" })({
    "& .editable-container": {
        overflowY: "scroll",
        height: "-webkit-fill-available",

        "&::-webkit-scrollbar": {
            width: "10px",
        },

        "&::-webkit-scrollbar-track": {
            backgroundColor: "#e3e3e3",
            borderRadius: "100px",
        },

        "&::-webkit-scrollbar-thumb": {
            borderRadius: "100px",
            border: "5px solid transparent",
            backgroundColor: "#1976d2",
        }
    },

    "& .editable": {
        height: '100%',
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

    "& .slate-toolbar": {
        height: "22%",
    },

    "& .editable-list": {
        height: "75%",
        marginTop: "auto",
    },

    "& .editable-list-elements": {
        overflowY: "scroll",

        "&::-webkit-scrollbar": {
            width: "10px",
        },

        "&::-webkit-scrollbar-track": {
            backgroundColor: "#e3e3e3",
            borderRadius: "100px",
        },

        "&::-webkit-scrollbar-thumb": {
            borderRadius: "100px",
            border: "5px solid transparent",
            backgroundColor: "#1976d2",
        }
    },
});