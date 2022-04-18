import { Box, Icon, IconButton, Paper, Popover, TextField } from '@mui/material';
import * as React from 'react';
import { FieldList, ListElement } from "../../utils/FieldList"
import { hasWhiteSpace } from '../../utils/hasWhiteSpace';
import { DeletableListItem, UndeletableListItem } from './ListItemBase';

type Props = {
    fieldList: FieldList
    onChange: (list: FieldList) => void
}

type SelectedElement = {
    anchorEl: Element
    element: ListElement
}

export const EditableList = ({ fieldList, onChange }: Props) => {
    const list = fieldList.GetList()

    const handleDelete = (element: ListElement) => {
        onChange(fieldList.Delete(element));
    }

    const [selectedElement, setSelectedElement] = React.useState<SelectedElement | null>(null)
    const open = Boolean(selectedElement);
    const anchorEl = open ? selectedElement.anchorEl : null

    const handleClick = (event: React.MouseEvent, element: ListElement) => {
        setSelectedElement({
            anchorEl: event.currentTarget,
            element: element,
        });
    }

    const handleEnter = (value: string) => {
        if (value === "" || value === selectedElement.element.name) return

        if (selectedElement.element.name === "") {
            const newElement = selectedElement.element
            newElement.name = value
            onChange(fieldList.Add(newElement))
        }
        else {
            const newElement = selectedElement.element
            newElement.name = value
            onChange(fieldList.Replace(selectedElement.element, newElement))
        }

        handleClose()
    }

    const handleClose = () => {
        setSelectedElement(null);
    };

    const validator = (value: string) => {
        if (hasWhiteSpace(value) || fieldList.ContainName(value)) {
            return false
        }
        return true
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: 'wrap',
                alignContent: 'flex-start',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: 200,
                    height: 300
                }}
            >
                {list.length > 0 &&
                    list.map((element) => {
                        const { name, isDeletable } = element;

                        return isDeletable ?
                            <DeletableListItem
                                key={name}
                                label={name}
                                onDelete={() => handleDelete(element)}
                                onClick={(event) => { handleClick(event, element) }}
                            />
                            :
                            <UndeletableListItem
                                key={name}
                                label={name}
                            />
                    })
                }

                <IconButton size='small'
                    onClick={
                        (event) => {
                            handleClick(event, { name: "", isDeletable: true })
                        }
                    }
                >
                    <Icon color='primary'>add_circle</Icon>
                </IconButton>

                {open &&
                    <Popover
                        id="change-field-name-popover"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <FieldNameInputField
                            id="new-field-name-input"
                            helperText="Введите название поля"
                            defaultValue={selectedElement.element.name}
                            onEnter={handleEnter}
                            validator={validator}
                        />
                    </Popover>
                }
            </Paper>
        </Box >
    )
}

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