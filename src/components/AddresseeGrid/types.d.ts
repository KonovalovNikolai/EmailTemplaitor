import { Variable } from "../../utils/VariableList";
import { Addressee } from "../../utils/Addressee";
import { IVariablesReducerAction } from "../../hooks/VariableListReducer";

export interface GridToolbarProps {
    onAdd: () => any;
    onDelete: (ids: Set<number>) => void;
}

export interface AddresseeGridProps {
    variableList: Variable[];
    addresseeList: Addressee[];
    onChange: React.Dispatch<IVariablesReducerAction>;
};