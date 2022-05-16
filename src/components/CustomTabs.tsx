import { IconButton, styled } from "@mui/material";
import { memo, useCallback } from "react";
import { TabIconButton } from "./StyledComponents";


interface TabButtonProps {
    index: number;
    value: number;
    icon: string | React.ReactElement;
    onChange: (index: number) => void;
}

export const TabButton = memo(({ index, value, icon, onChange }: TabButtonProps) => {
    const isCurrent = value === index;

    const handleClick = useCallback(
        () => onChange(index), [index]

    );

    return (
        <TabIconButton
            disableRipple={true}
            disableTouchRipple={true}
            size="large"
            current={isCurrent}
            onClick={handleClick}
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