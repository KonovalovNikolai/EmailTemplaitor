import { Box, Grid, Popover } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';

import { hasWhiteSpace } from '../utils/hasWhiteSpace';

import ScrollableBox from '../../ScrollableBox';
import { DefaultSortButtonState } from '../utils/SortButtonState';
import NewFieldButton from './AddNewFieldButton';
import { FieldNameInputField } from './FieldNameInput';
import { DeletableListItem, UndeletableListItem } from './ListItemBase';
import ListTopBar from './ListTopBar';

import { EditableListProps, EditableListTopBarData } from '../types';

// Дата состояния выделенного элемента
interface SelectedElementData<T> {
    anchorEl: Element;
    element: T | null;
};

export const EditableList = memo(({ elementList, getLabel, isChangeable, onAdd, onRename, onRemove }: EditableListProps<any>) => {
    // Состояние верхней панели
    const [barState, setBarState] = React.useState<EditableListTopBarData>(
        {
            searchValue: "",
            sortState: new DefaultSortButtonState<any>()
        }
    );

    // Состояние выделенного элемента
    const [selectedElement, setSelectedElement] = useState<SelectedElementData<any> | null>(null);

    // Список элементов списка
    // Список сортируется по текущему состоянию сортировки
    // Список фильтруется по текущему значению строки поиска
    let filteredList = elementList.filter(element =>
        getLabel(element).toLowerCase().startsWith(barState.searchValue)
    );
    filteredList = barState.sortState.Sort(filteredList, getLabel);

    // Обработка нажатия на элемент
    // Вызвать popup для ввода имени поля
    const handleClick = useCallback(
        (event: React.MouseEvent, element: any) => {
            setSelectedElement({
                anchorEl: event.currentTarget,
                element: element,
            });
        },
        []
    );

    // Обработка нажатия Enter при вводе имени
    const handleEnter = (value: string) => {
        // Если поле пустое или имеет тоже значение, что и текущее имя элемента,
        // то изменения не будут приняты
        if (value === "") return;

        // Если текущий выделенный элемент не имеет имени,
        // значит это создание нового элемента
        if (selectedElement.element === null) {
            // Добавление нового элемента в список
            onAdd(value);
        }
        else {
            // Изменение имени выбранного элемента
            onRename(selectedElement.element, value);
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
        const element = elementList.find(element => {
            if (getLabel(element) === value) {
                return true;
            }
        });

        if (hasWhiteSpace(value) || element !== undefined) {
            return false;
        }
        return true;
    };

    return (
        <Box
            sx={{
                flex: "auto",
                height: "-webkit-fill-available",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    flex: "none",
                    padding: "10px 10px 10px 10px",
                }}
            >
                <ListTopBar
                    onChange={setBarState}
                />
            </Box>

            <ScrollableBox
                sx={{
                    flex: "auto",
                    overflowY: "scroll",
                }}
            >
                <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="baseline"
                    spacing={0.5}
                    sx={{
                        padding: "0 5px 0 0",
                    }}
                >
                    {filteredList.length > 0 &&
                        filteredList.map((element) => {
                            const { name, isDeletable } = element;

                            return isDeletable ?
                                <DeletableListItem
                                    key={name}
                                    element={element}
                                    onDelete={onRemove}
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
                        defaultValue={selectedElement.element ? getLabel(selectedElement.element) : ""}
                        onEnter={handleEnter}
                        validator={validator}
                    />
                </Popover>
            }
        </Box >
    );
});