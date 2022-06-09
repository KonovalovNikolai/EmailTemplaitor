import { Variable } from "../../utils/VariableList";
import { Addressee } from "../../utils/Addressee";
import { IDocumentReducerAction } from "../../hooks/DocumentReducer";
import React, { ReactNode } from "react";

export interface GridToolbarProps {
    onAdd: () => void;
    onDelete: (ids: Set<number>) => void;
    onPreview: (id: number) => void;
}

export interface AddresseeGridProps {
    variableList: Variable[];
    addresseeList: Addressee[];
    onChange: React.Dispatch<IDocumentReducerAction>;
    onPreview: (addressee: Addressee) => JSXElement;
};
