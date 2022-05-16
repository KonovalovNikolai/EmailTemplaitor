import { styled } from "@mui/system";


export const EditorContainerEditableArea = styled("div", { name: "EditorContainerEditableArea" })({
    "& .editable-container": {
        // overflowY: "scroll",
        // height: "-webkit-fill-available",

        // "&::-webkit-scrollbar": {
        //     width: "10px",
        // },

        // "&::-webkit-scrollbar-track": {
        //     backgroundColor: "#e3e3e3",
        //     borderRadius: "100px",
        // },

        // "&::-webkit-scrollbar-thumb": {
        //     borderRadius: "100px",
        //     border: "5px solid transparent",
        //     backgroundColor: "#1976d2",
        // }
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
