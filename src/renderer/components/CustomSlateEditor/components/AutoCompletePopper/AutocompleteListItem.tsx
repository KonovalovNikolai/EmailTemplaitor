import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/system";

type Props = {
    char: string;
    isSelected: boolean;
    onClick: () => void;
};

const ItemButton = styled(ListItemButton, { name: "ElementListItemButton" })(({ theme }) => ({
    paddingTop: 0,
    paddingBottom: 0,
}));

const ItemLabel = styled(Typography, { name: "ElementLabel" })(({
    fontWeight: "300",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
}));

export const ItemIcon = styled(ListItemIcon, {name: "ItemIcon",})({
    minWidth: 0,
    paddingRight: "5px",
});

export const AutocompleteListItem = ({ char, isSelected, onClick }: Props) => {
    return (
        <ListItem disablePadding >
            <ItemButton
                selected={isSelected}
                onMouseDown={(e) => {
                    e.preventDefault();
                    onClick();
                }}
            >
                <ItemIcon>
                    <Typography>#</Typography>
                </ItemIcon>
                <ListItemText
                    primary={
                        <ItemLabel>
                            {char}
                        </ItemLabel>
                    }
                />
            </ItemButton>
        </ListItem >
    );
};