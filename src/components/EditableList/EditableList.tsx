import React, { useCallback, useState } from 'react';
import { Box, Popover} from '@mui/material';

import { FieldList, ListElement } from "../../utils/FieldList"
import { hasWhiteSpace } from '../../utils/hasWhiteSpace';

import { DeletableListItem, UndeletableListItem } from './ListItemBase';
import ListTopBar from './ListTopBar';
import { FieldNameInputField } from './FieldNameInputField';
import AddNewFieldButton from './AddNewFieldButton';

type Props = {
    fieldList: FieldList
    onChange: React.Dispatch<React.SetStateAction<FieldList>>
}

// Дата состояния выделенного элемента
type SelectedElementData = {
    anchorEl: Element
    element: ListElement
}

type TopBarData = {
    searchValue: string
}

class SortButtonState {
    public Sort(list: ListElement[]) {
        return list.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        })
    }
    
}

export const EditableList = ({ fieldList, onChange }: Props) => {
    //#region - Top Bar -
    // Состояние строки поиска
    const [serchValue, setSearch] = React.useState("")

    // Обработка ввода в поисковую строку
    const handleSearchInput = React.useCallback(
        (value: string) => setSearch(value.toLowerCase()), []
    )
    //#endregion

    //#region - Field List -
    // Список элементов списка
    // Список фильтруется по текущему значению строки посика
    const list = fieldList.GetList(serchValue)
    // Обработка удаление элемента
    const handleDelete = useCallback(
        (element: ListElement) => {
            onChange(prevList => prevList.Delete(element));
        },
        []
    )

    // Обработка нажатия на элемент
    // Вызвать попап для ввода имени поля
    const handleClick = useCallback(
        (event: React.MouseEvent, element: ListElement) => {
            setSelectedElement({
                anchorEl: event.currentTarget,
                element: element,
            });
        },
        []
    )

    //#endregion

    //#region - Field Name Input Popover -
    // Состояние выделенного элемента
    const [selectedElement, setSelectedElement] = useState<SelectedElementData | null>(null)

    // Обработка нажатия Enter при вводе имени
    const handleEnter = (value: string) => {
        // Если поле пустое или имеет тоже значение, что и текущее имя элемента,
        // то изменения не будут приняты
        if (value === "" || value === selectedElement.element.name) return

        // Если текущий выделенный элемент не имеет имени,
        // значит это создание нового элемента
        if (selectedElement.element.name === "") {
            // Добавление нового элемента в список
            const newElement = selectedElement.element
            newElement.name = value
            onChange(fieldList.Add(newElement))
        }
        else {
            // Изменение имени выбранного элемента
            const newElement = selectedElement.element
            newElement.name = value
            onChange(fieldList.Replace(selectedElement.element, newElement))
        }

        // Закрыть попап
        handleClose()
    }

    // Обработка закрытия попапа
    const handleClose = () => {
        setSelectedElement(null);
    };

    // Валидатор значения поля ввода нового имени
    const validator = (value: string) => {
        if (hasWhiteSpace(value) || fieldList.ContainName(value)) {
            return false
        }
        return true
    }

    //#endregion

    return (
        <Box
            sx={{
                width: 200,
                height: 300,
            }}
        >
            <ListTopBar
                onChange={handleSearchInput}
            />

            <Box
                sx={{
                    display: "flex",
                    flexWrap: 'wrap',
                    alignContent: 'flex-start',
                    height: 1
                }}
            >
                {list.length > 0 &&
                    list.map((element) => {
                        const { name, isDeletable } = element;

                        return isDeletable ?
                            <DeletableListItem
                                key={name}
                                element={element}
                                onDelete={handleDelete}
                                onClick={handleClick}
                            />
                            :
                            <UndeletableListItem
                                key={name}
                                label={name}
                            />
                    })
                }

                <AddNewFieldButton
                    onClick={handleClick}
                />

                {!!selectedElement &&
                    <Popover
                        id="change-field-name-popover"
                        open={true}
                        anchorEl={selectedElement.anchorEl}
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
            </Box>
        </Box >
    )
}