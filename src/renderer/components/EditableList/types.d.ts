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
  (element: T): boolean;
}

export interface OnNameInputEnter {
  (value: string): boolean;
}

export interface NameValidator {
  (value: string): boolean;
}

export interface OnElementClick<T> {
  (element: T): void;
}

/** Состояние кнопки сортировки */
export interface ISortState<T> {
  /** Сортировка списка элементов */
  Sort(list: T[], getLabel: IGetLabel<T>): T[];
  /** Сменить состояние */
  ChangeState(): ISortState<T>;
}


export interface EditableListTopBarData<T> {
  searchValue: string;
  sortState: ISortState<T>;
}

export interface EditableListProps<T> {
  label: string;
  elementList: T[];
  getLabel: IGetLabel<T>;
  isChangeable: isChangeable<T>;
  onElementClick: OnElementClick<T>;
  onRename: onRename<T>;
  onAdd: (newElementName: string) => void;
  onRemove: onRemove<T>;
}

export interface ElementListProps<T> {
  list: T[];
  getLabel: IGetLabel<T>;
  isChangeable: isChangeable<T>;
  onElementClick: OnElementClick<T>;
  onRename: onRename<T>;
  onRemove: onRemove<T>;
}

export interface ListItemBaseProps {
  children: React.ReactNode;
}

interface ListItemProps<T> {
  element: T;
  label: string;
  onElementClick: OnElementClick<T>;
}

export interface DeletableListItemProps<T> extends ListItemProps<T> {
  onDelete: onRemove<T>;
  onRename: (event: React.MouseEvent, element: T) => void;
}

export interface UndeletableListItemProps<T> extends ListItemProps<T> { }

export interface EditableListTopBarProps<T> {
  onChange: React.Dispatch<React.SetStateAction<EditableListTopBarData<T>>>;
}
