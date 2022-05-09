export interface EditableListProps {
    fieldList: Field[];
    onChange: React.Dispatch<IFieldsReducerAction>;
};

export interface EditableListTopBarData {
    searchValue: string;
    sortState: SortButtonState;
};

export interface EditableListTopBarProps {
    onChange: React.Dispatch<React.SetStateAction<TopBarData>>;
};