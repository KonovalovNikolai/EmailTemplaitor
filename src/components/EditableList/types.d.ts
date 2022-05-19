/** Интерфейс функции получения названия элемента для списка */
export interface IGetLabel<T> {
    (element: T): string;
}

export interface onRename<T> {
    (element: T, newName: string): void;
}

export interface onRemove<T> {
    (element: T): void;
}

export interface isChangeable<T> {
    (element: T): boolean
}

export interface OnNameInputEnter {
    (value: string): boolean;
}

export interface NameValidator {
    (value: string): boolean;
}

/** Состояние кнопки сортировки */
export interface ISortState<T> {
    /** Сортировка списка элементов */
    Sort(list: T[], getLabel: IGetLabel<T>): T[];
    /** Сменить состояние */
    ChangeState(): ISortState;
}


export interface EditableListTopBarData {
    searchValue: string;
    sortState: ISortState<T>;
};

export interface EditableListProps<T> {
    label: string;
    elementList: T[];
    getLabel: IGetLabel<T>;
    isChangeable: isChangeable<T>;
    onRename: onRename<T>;
    onAdd: (newElementName: string) => void;
    onRemove: onRemove<T>;
};

export interface ElementListProps<T> {
    list: T[];
    getLabel: IGetLabel<T>;
    isChangeable: isChangeable<T>;
    onRename: onRename<T>;
    onRemove: onRemove<T>;
}

export interface ListItemBaseProps {
    children: React.ReactNode;
};

export interface DeletableListItemProps<T> {
    element: T;
    label: string;
    onDelete: onRemove<T>;
    onRename: (event: React.MouseEvent, element: T) => void;
}

export interface UndeletableListItemProps {
    label: string;
}

export interface EditableListTopBarProps {
    onChange: React.Dispatch<React.SetStateAction<TopBarData>>;
};