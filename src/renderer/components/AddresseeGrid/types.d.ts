import { Variable } from "../../utils/VariableList";
import { Addressee } from "../../utils/Addressee";
import { IVariablesReducerAction } from "../../hooks/DocumentReducer";
import React, { ReactNode } from "react";

export interface GridToolbarProps {
    onAdd: () => void;
    onDelete: (ids: Set<number>) => void;
    onPreview: (id: number) => void;
}

export interface AddresseeGridProps {
    variableList: Variable[];
    addresseeList: Addressee[];
    onChange: React.Dispatch<IVariablesReducerAction>;
    onPreview: (addressee: Addressee) => JSXElement;
};
