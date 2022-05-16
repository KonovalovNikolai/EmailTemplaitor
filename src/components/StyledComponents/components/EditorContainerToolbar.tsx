import { styled } from "@mui/system";


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
