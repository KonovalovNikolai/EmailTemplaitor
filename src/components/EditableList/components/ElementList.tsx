import { List } from "@mui/material";
import { styled } from '@mui/material/styles';
import { memo } from "react";

import { ElementListProps } from "../types";
import { DeletableListItem, UndeletableListItem } from "./ListItem";

const ElementListBox = styled(List, { name: "ElementListBox" })(({theme}) => ({
    overflowY: "overlay" as any,

    width: "184px",
    paddingBottom: 0,
    paddingTop: 0,

    alignSelf: "stretch",
    flexGrow: "1",

    "::-webkit-scrollbar": {
        width: "11px",
    },

    "::-webkit-scrollbar-track": {
        background: "transparent",
    },

    "::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.divider,
    }
}));

export const ElementList = memo((
    {
        list,
        getLabel,
        isChangeable,
        onRemove,
        onRename
    }: ElementListProps<any>
) => {
    return (
        <ElementListBox dense>
            {
                list.length > 0 &&
                list.map((element) => {
                    const name = getLabel(element);
                    const isElementChangeable = isChangeable(element);

                    return isElementChangeable ?
                        <DeletableListItem
                            key={name}
                            label={name}
                            element={element}
                            onDelete={onRemove}
                            onRename={onRename}
                        />
                        :
                        <UndeletableListItem key={name} label={name} />;
                })
            }
        </ElementListBox>
    );
});

export default ElementList;