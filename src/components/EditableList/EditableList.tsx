import React, { memo, useCallback, useState } from 'react';
import { Box, Grid, Popover } from '@mui/material';

import { FieldList, Field } from "../../utils/FieldList";
import { hasWhiteSpace } from './utils/hasWhiteSpace';

import { DeletableListItem, UndeletableListItem } from './components/ListItemBase';
import ListTopBar from './components/ListTopBar';
import { FieldNameInputField } from './components/FieldNameInputField';
import NewFieldButton from './components/AddNewFieldButton';
import { DefaultSortButtonState, SortButtonState } from './utils/SortButtonState';
import ScrollableBox from '../ScrollableBox';
import { AppDataController } from '../../utils/AppDataController';

type Props = {
    appData: AppDataController;
    onChange: React.Dispatch<React.SetStateAction<AppDataController>>;
};

// Дата состояния выделенного элемента
type SelectedElementData = {
    anchorEl: Element;
    element: Field;
};

export type TopBarData = {
    searchValue: string;
    sortState: SortButtonState;
};

export const EditableList = memo(({ appData, onChange }: Props) => {
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
    const list = barState.sortState.Sort(appData.GetFieldList().GetList(barState.searchValue));
    // Обработка удаление элемента
    const handleDelete = useCallback(
        (element: Field) => {
            onChange(data => {
                data.RemoveField(element);
                return data.CreateNew();
            });
        },
        []
    );

    // Обработка нажатия на элемент
    // Вызвать поппап для ввода имени поля
    const handleClick = useCallback(
        (event: React.MouseEvent, element: Field) => {
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
            appData.AddField(newElement);
            onChange(appData.CreateNew());
        }
        else {
            // Изменение имени выбранного элемента
            const newElement = selectedElement.element;
            newElement.name = value;
            appData.RenameField(selectedElement.element, newElement);
            onChange(appData.CreateNew());
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
        if (hasWhiteSpace(value) || appData.GetFieldList().ContainName(value)) {
            return false;
        }
        return true;
    };

    //#endregion

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