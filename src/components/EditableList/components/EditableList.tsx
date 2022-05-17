import { Divider, List, Popover, styled, Typography } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';

import { hasWhiteSpace } from '../utils/hasWhiteSpace';

import { DefaultSortButtonState } from '../utils/SortButtonState';
import { NameInputField } from './NameInputField';
import { DeletableListItem, UndeletableListItem } from './ListItem';
import ListTopBar from './ListTopBar';

import { EditableListProps, EditableListTopBarData } from '../types';
import ElementList from './ElementList';
import { RenamePopper } from './RenamePopper';

// Дата состояния выделенного элемента
interface SelectedElementData<T> {
    anchorEl: Element;
    element: T;
};

const EditableListBox = styled("div", { name: "VariableListBox" })({
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
});

const ListName = styled(Typography, { name: "ListName" })(({ theme }) => ({
    fontWeight: "300",
    paddingLeft: "10px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    color: theme.palette.neutral.dark,

    flex: "none",
    alignSelf: "stretch",
    flexGrow: 0,
}));

export const EditableList = memo(
    ({
        label,
        elementList,
        getLabel,
        isChangeable,
        onAdd,
        onRename,
        onRemove
    }: EditableListProps<any>) => {
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
        const handleEdit = useCallback(
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
            if (value === "") return false;

            // Изменение имени выбранного элемента
            onRename(selectedElement.element, value);

            // Закрыть поппап
            handleClose();

            return false;
        };

        const handleAdd = (value: string) => {
            if (value === "") return false;

            onAdd(value);

            return true;
        };

        // Обработка закрытия поппапа
        const handleClose = () => {
            setSelectedElement(null);
        };

        // Валидатор значения поля ввода нового имени
        const validator = (value: string) => {
            if (value === "" || hasWhiteSpace(value)) {
                return false;
            }

            const element = elementList.find(element => {
                if (getLabel(element) === value) {
                    return true;
                }
            });

            if (element !== undefined) {
                return false;
            }
            return true;
        };

        let anchorEl = null;
        let popperValue = "";
        let popperOpen = false;
        if (!!selectedElement) {
            popperOpen = true;
            anchorEl = selectedElement.anchorEl;
            popperValue = getLabel(selectedElement.element);
        }

        return (
            <EditableListBox>

                <ListName>{label}</ListName>

                <ListTopBar onChange={setBarState} />

                <Divider />

                <ElementList
                    list={filteredList}
                    getLabel={getLabel}
                    isChangeable={isChangeable}
                    onRename={handleEdit}
                    onRemove={onRemove}
                />

                <Divider />

                <NameInputField
                    helperText="Новая переменная"
                    defaultValue={""}
                    onEnter={handleAdd}
                    validator={validator}
                />

                {popperOpen &&
                    <RenamePopper
                        anchorEl={anchorEl}
                        defaultValue={popperValue}
                        onEnter={handleEnter}
                        onClose={handleClose}
                        validator={validator}
                    />
                }
            </EditableListBox >
        );
    });