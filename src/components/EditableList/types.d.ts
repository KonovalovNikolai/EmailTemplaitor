/** Интерфейс функции получения названия элемента для списка */
export interface IGetLabel<T> {
    (element: T): string;
}

/** Интерфейс функции нажатия на элемент в списке */
export interface IOnElementClick<T> {
    (event: React.MouseEvent, element: T): void;
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
    isChangeable: (element: T) => boolean;
    onRename: (element: T, newName: string) => void;
    onAdd: (newElementName: string) => void;
    onRemove: (element: T) => void;
};

export interface ElementListProps<T> {
    list: T[];
    getLabel: IGetLabel<T>;
    isChangeable: (element: T) => boolean;
    onRename: (element: T, newName: string) => void;
    onRemove: (element: T) => void;
}

export interface ListItemBaseProps {
    children: React.ReactNode;
};

export interface DeletableListItemProps<T> {
    element: T;
    label: string;
    onDelete: (element: T) => void;
    onRename: IOnElementClick<T>;
}

export interface UndeletableListItemProps {
    label: string;
}

export interface NewElementButtonProps<T> {
    onRename: IOnElementClick<T>;
}

export interface EditableListTopBarProps {
    onChange: React.Dispatch<React.SetStateAction<TopBarData>>;
};