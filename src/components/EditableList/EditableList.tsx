import React, { memo, useCallback, useState } from 'react';
import { Box, Grid, Popover } from '@mui/material';

import { FieldList, ListElement } from "./utils/FieldList";
import { hasWhiteSpace } from './utils/hasWhiteSpace';

import { DeletableListItem, UndeletableListItem } from './components/ListItemBase';
import ListTopBar from './components/ListTopBar';
import { FieldNameInputField } from './components/FieldNameInputField';
import NewFieldButton from './components/AddNewFieldButton';
import { DefaultSortButtonState, SortButtonState } from './utils/SortButtonState';
import ScrollableBox from '../ScrollableBox';

type Props = {
    fieldList: FieldList;
    onChange: React.Dispatch<React.SetStateAction<FieldList>>;
};

// Дата состояния выделенного элемента
type SelectedElementData = {
    anchorEl: Element;
    element: ListElement;
};

export type TopBarData = {
    searchValue: string;
    sortState: SortButtonState;
};

export const EditableList = memo(({ fieldList, onChange }: Props) => {
    //#region - Top Bar -
    // Состояние верхней панели
    const [barState, setBarState] = React.useState<TopBarData>(
        {
            searchValue: "",
            sortState: new DefaultSortButtonState()
        }
    );
    //#endregion

    //#region - Field List -
    // Список элементов списка
    // Список сортируется по текущему состоянию сортировки
    // Список фильтруется по текущему значению строки поиска
    const list = barState.sortState.Sort(fieldList.GetList(barState.searchValue));
    // Обработка удаление элемента
    const handleDelete = useCallback(
        (element: ListElement) => {
            onChange(prevList => prevList.Delete(element));
        },
        []
    );

    // Обработка нажатия на элемент
    // Вызвать поппап для ввода имени поля
    const handleClick = useCallback(
        (event: React.MouseEvent, element: ListElement) => {
            setSelectedElement({
                anchorEl: event.currentTarget,
                element: element,
            });
        },
        []
    );

    //#endregion

    //#region - Field Name Input Popover -
    // Состояние выделенного элемента
    const [selectedElement, setSelectedElement] = useState<SelectedElementData | null>(null);

    // Обработка нажатия Enter при вводе имени
    const handleEnter = (value: string) => {
        // Если поле пустое или имеет тоже значение, что и текущее имя элемента,
        // то изменения не будут приняты
        if (value === "" || value === selectedElement.element.name) return;

        // Если текущий выделенный элемент не имеет имени,
        // значит это создание нового элемента
        if (selectedElement.element.name === "") {
            // Добавление нового элемента в список
            const newElement = selectedElement.element;
            newElement.name = value;
            onChange(fieldList.Add(newElement));
        }
        else {
            // Изменение имени выбранного элемента
            const newElement = selectedElement.element;
            newElement.name = value;
            onChange(fieldList.Replace(selectedElement.element, newElement));
        }

        // Закрыть поппап
        handleClose();
    };

    // Обработка закрытия поппапа
    const handleClose = () => {
        setSelectedElement(null);
    };

    // Валидатор значения поля ввода нового имени
    const validator = (value: string) => {
        if (hasWhiteSpace(value) || fieldList.ContainName(value)) {
            return false;
        }
        return true;
    };

    //#endregion

    return (
        <Box
            sx={{
                height: "-webkit-fill-available",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    padding: "10px 10px 10px 10px"
                }}
            >
                <ListTopBar
                    onChange={setBarState}
                />
            </Box>

            <ScrollableBox
                sx={{
                    overflowY: "auto",
                    border: "2px solid transparent",
                }}
            >
                <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="baseline"
                    spacing={0.5}
                    sx={{
                        padding: "0 4px 0 4px",
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
                                />;
                        })
                    }

                    <Grid item xs={1}
                    >
                        <NewFieldButton
                            onClick={handleClick}
                        />
                    </Grid>
                </Grid>
            </ScrollableBox>

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
        </Box >
    );
});