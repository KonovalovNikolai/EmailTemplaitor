export interface GridToolbarProps {
    onAdd: () => any;
    onDelete: (ids: Set<number>) => void;
}

export interface AddresseeGridProps {
    fieldList: Field[];
    addresseeList: Addressee[];
    onChange: React.Dispatch<IFieldsReducerAction>;
};