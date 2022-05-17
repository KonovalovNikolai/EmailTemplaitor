import { styled } from "@mui/system";


export const EditorBox = styled("div", { name: "EditorBox" })({
    flex: "auto",

    "& .editable": {
        height: '100%',
        lineHeight: "1.4",

        "& p": {
            margin: 0
        },

        "&.editable > * + *": {
            marginTop: "1em",
        }
    },
});
