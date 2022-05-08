import { log } from "console";
import { useState } from "react";
import { addAddresseeFieldToList, Addressee, createAddressee, removeAddresseeFieldFromList, renameAddresseeFieldInList } from "../utils/Addressee";
import { Field, removeFieldFromList, renameFieldInList } from "../utils/FieldList";

type FieldsReducerState = {
    fieldList: Field[],
    addresseeList: Addressee[];
};

export interface IFieldsReducerAction {
    Action(state: FieldsReducerState): FieldsReducerState;
}

export class AddFieldAction implements IFieldsReducerAction {
    private _newField: Field;

    public constructor(newField: Field) {
        this._newField = newField;
    }
    public Action(state: FieldsReducerState): FieldsReducerState {
        const { fieldList, addresseeList } = { ...state };
        fieldList.push(this._newField);
        const newAddresseeList = addAddresseeFieldToList(addresseeList, this._newField);

        return {
            fieldList: fieldList,
            addresseeList: newAddresseeList
        };
    }
}

export class DeleteFieldAction implements IFieldsReducerAction {
    private _field: Field;

    public constructor(field: Field) {
        this._field = field;
    }

    public Action(state: FieldsReducerState): FieldsReducerState {
        const { fieldList, addresseeList } = { ...state };
        const newFieldList = removeFieldFromList(fieldList, this._field);
        const newAddresseeList = removeAddresseeFieldFromList(addresseeList, this._field);

        return {
            fieldList: newFieldList,
            addresseeList: newAddresseeList,
        };
    }
}

export class RenameFieldAction implements IFieldsReducerAction {
    private _field: Field;
    private _newField: Field;

    public constructor(field: Field, newField: Field) {
        this._field = field;
        this._newField = newField;
    }

    public Action(state: FieldsReducerState): FieldsReducerState {
        const { fieldList, addresseeList } = { ...state };
        const newFieldList = renameFieldInList(fieldList, this._field);
        const newAddresseeList = renameAddresseeFieldInList(addresseeList, this._field, this._newField);

        return {
            fieldList: newFieldList,
            addresseeList: newAddresseeList
        };
    }
}

export class AddAddresseeAction implements IFieldsReducerAction {
    private _newAddressee: Addressee;
    public constructor(newAddressee: Addressee = undefined) {
        this._newAddressee = newAddressee;
    }

    public Action(state: FieldsReducerState): FieldsReducerState {
        if (!this._newAddressee) {
            this._newAddressee = createAddressee(state.fieldList);
        }

        const newAddresseeList = [...state.addresseeList];
        newAddresseeList.push(this._newAddressee);

        return {
            fieldList: state.fieldList,
            addresseeList: newAddresseeList
        };
    }
}

export class RemoveAddresseeAction implements IFieldsReducerAction {
    private _index: number;
    public constructor(index: number) {
        this._index = index;
    }

    public Action(state: FieldsReducerState): FieldsReducerState {
        const addresseeList = state.addresseeList;
        if (this._index > addresseeList.length) {
            return state;
        }

        return {
            ...state,
            addresseeList: addresseeList.splice(this._index, 1)
        };
    }
}

export function initFieldReducer(fieldList: Field[], addresseeList: Addressee[]) {
    return {
        fieldList: fieldList,
        addresseeList: addresseeList,
    } as FieldsReducerState;
}

export function fieldsReducer(state: FieldsReducerState, action: IFieldsReducerAction) {
    if (!action) {
        return;
    }

    return action.Action(state);
}