import { Typography } from "@mui/material";
import { styled } from "@mui/system";

type Props = {
    char: string;
    isSelected: boolean;
    onClick: () => void;
};


const AutocompleteItemContainer = styled("div")({
    padding: '1px 3px', 
    cursor: 'pointer',
    ":hover" : {
        background: "#f3f8ff"
    }
});

export const AutocompleteListItem = ({ char, isSelected, onClick }: Props) => {
    return (
        <AutocompleteItemContainer
            onMouseDown={onClick}
            sx={{background: isSelected ? '#b4c2ff!important' : 'transparent',}}
        >
            <Typography>
                {char}
            </Typography>
        </AutocompleteItemContainer>
    );
};