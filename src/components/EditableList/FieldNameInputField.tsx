import { TextField } from "@mui/material"
import React from "react"

type FieldNameInputFieldProps = {
    id: string
    helperText: string
    defaultValue: string
    onEnter: (value: string) => void
    validator: (value: string) => boolean
}

export const FieldNameInputField = ({
    id,
    helperText,
    defaultValue,
    onEnter,
    validator
}: FieldNameInputFieldProps) => {
    const [value, setValue] = React.useState(defaultValue);
    const isError = value === defaultValue ? false : !validator(value)

    return (
        <TextField
            id={id}
            variant="outlined"
            helperText={helperText}
            autoFocus
            error={isError}

            value={value}

            onKeyDown={(e) => {
                if (isError) return

                if (e.key === "Enter") {
                    onEnter(value)
                }
            }}

            onChange={(e) => {
                setValue(e.target.value)
            }}

            sx={{
                margin: 0.5
            }}
        />
    )
}