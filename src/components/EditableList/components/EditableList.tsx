import { Divider, Paper, Typography } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { hasWhiteSpace } from '../utils/hasWhiteSpace';

import { DefaultSortButtonState } from '../utils/SortButtonState';
import ListTopBar from './ListTopBar';
import { NameInputField } from './NameInputField';

import { EditableListProps, EditableListTopBarData, NameValidator, OnNameInputEnter } from '../types';
import ElementList from './ElementList';
import { RenamePopper } from './RenamePopper';

// Дата состояния выделенного элемента
interface SelectedElementData<T> {
    anchorEl: Element;
    element: T;
};

const EditableListBox = styled(Paper, { name: "VariableListBox" })(({ theme }) => ({
    borderRadius: 0,

    width: "184px",

    display: "flex",
    flexDirection: "column",

    flex: "none",
    alignSelf: "stretch",
    flexGrow: "0",
}));

const ListName = styled(Typography, { name: "ListName" })(({ theme }) => ({
    fontWeight: "300",
    paddingLeft: "10px",
    height: "40px",
    display: "flex",
    alignItems: "center",

    color: theme.palette.grey[500], // #9e9e9e

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
        onElementClick,
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
        const handleEnter: OnNameInputEnter = (value: string) => {
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
        const validator: NameValidator = (value: string) => {
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
            <EditableListBox elevation={0}>
                <ListName>{label}</ListName>

                <ListTopBar onChange={setBarState} />

                <Divider />

                <ElementList
                    list={filteredList}
                    getLabel={getLabel}
                    isChangeable={isChangeable}
                    onElementClick={onElementClick}
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