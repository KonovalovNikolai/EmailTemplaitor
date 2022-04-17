import { Box, Paper, Popover, TextField } from '@mui/material';
import * as React from 'react';
import { FieldList, ListElement } from "../../utils/FieldList"
import { DeletableListItem, UndeletableListItem } from './ListItemBase';

type Props = {
    fieldList: FieldList
    onChange: (list: FieldList) => void
}

type SelectedElement = {
    anchorEl: Element
    element: ListElement
    value: string
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
            value: element.name
        });
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            const newElement = { ...selectedElement.element }
            newElement.name = selectedElement.value
            onChange(fieldList.Replace(selectedElement.element, newElement))
            handleClose()
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSelectedElement({
            anchorEl: selectedElement.anchorEl,
            element: selectedElement.element,
            value: event.target.value
        })
    }

    const handleClose = () => {
        setSelectedElement(null);
    };

    return (
        <Box
            sx={{
                width: 200,
                height: 300,
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

            {open &&
                <Popover
                    id="change-field-name-popover"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <TextField
                        id="new-field-name-input"
                        variant="outlined"
                        helperText="Введите новое название поля"
                        value={selectedElement.value}
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        sx={{
                            margin: 0.5
                        }}
                    />
                </Popover>
            }
        </Paper>
        </Box >
    )
}