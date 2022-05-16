
import { IconButton, styled } from "@mui/material";
import { memo, useCallback } from "react";

interface TabButtonProps {
    index: number;
    value: number;
    icon: string | React.ReactElement;
    onChange: (index: number) => void;
}

const TabIconButton = styled(IconButton, { name: "TabIconButton" })(({theme}) => ({
    padding: "5px",
    ":hover": {
        color: "#1976d2"
    }
}));

export const TabButton = memo(({ index, value, icon, onChange }: TabButtonProps) => {
    const isCurrent = value === index;

    const handleClick = useCallback(
        () => onChange(index), [index]

    );

    return (
        <TabIconButton
            // disableFocusRipple={true}
            disableRipple={true}
            disableTouchRipple={true}
            size="large"
            color={isCurrent ? "primary" : "default"}
            onClick={handleClick}
            sx={{ padding: "5px", }}
        >
            {icon}
        </TabIconButton>
    );
});

interface TabContentProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const TabContent = memo(({ index, value, children }: TabContentProps) => {
    const isCurrent = index === value;

    return (
        <>
            {isCurrent && <>{children}</>}
        </>
    );
});