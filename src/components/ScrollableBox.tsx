import { Box, } from "@mui/material";
import { styled } from "@mui/system";

const ScrollableBox = styled(Box)({
    "&::-webkit-scrollbar": {
        width: "10px"
    },

    "&::-webkit-scrollbar-track": {
        backgroundColor: "#e3e3e3",
        borderRadius: "100px",
    },

    "&::-webkit-scrollbar-thumb": {
        borderRadius: "100px",
        border: "5px solid transparent",
        backgroundColor: "#1976d2",
    },
});

export default ScrollableBox;