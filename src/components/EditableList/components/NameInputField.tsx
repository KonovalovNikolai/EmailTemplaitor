import { InputAdornment, styled, TextField, Typography } from "@mui/material";
import React from "react";
import { NameValidator, OnNameInputEnter } from "../types";

const NameTextField = styled(TextField, { name: "NameTextField" })({
    margin: 0.5,

    padding: "8px 5px",

    height: "80px",

    flex: "none",
    alignSelf: "stretch",
    flexGrow: 0,
});

type NameInputFieldProps = {
    helperText: string;
    defaultValue: string;
    onEnter: OnNameInputEnter;
    validator: NameValidator;
};

export const NameInputField = ({
    helperText,
    defaultValue,
    onEnter,
    validator
}: NameInputFieldProps) => {
    const [value, setValue] = React.useState(defaultValue);
    const isError = value === defaultValue ? false : !validator(value);

    return (
        <NameTextField
            variant="outlined"
            helperText={helperText}
            autoFocus
            error={isError}

            value={value}

            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Typography>#</Typography>
                    </InputAdornment>
                ),
            }}

            onKeyDown={(e) => {
                if (isError || value === defaultValue) return;

                if (e.key === "Enter") {
                    const res = onEnter(value);

                    if (res) {
                        setValue(defaultValue);
                    }
                }
            }}

            onChange={(e) => {
                setValue(e.target.value);
            }}
        />
    );
};