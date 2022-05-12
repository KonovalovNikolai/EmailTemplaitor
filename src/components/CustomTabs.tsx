import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { memo, useCallback } from "react";

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
        <IconButton
            size="large"
            color={isCurrent ? "primary" : "default"}
            onClick={handleClick}
        >
            {icon}
        </IconButton>
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