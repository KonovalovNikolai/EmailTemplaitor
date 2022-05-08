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
    public newAddressee: Addressee;
    public newAddresseeIndex: number;
    public constructor(private _shouldUpdate: boolean, newAddressee?: Addressee) {
        this.newAddressee = newAddressee;
    }

    public Action(state: FieldsReducerState): FieldsReducerState {
        if (!this.newAddressee) {
            this.newAddressee = createAddressee(state.fieldList);
        }

        state.addresseeList.push(this.newAddressee);

        this.newAddresseeIndex = state.addresseeList.length - 1;

        if (this._shouldUpdate) {
            return {
                fieldList: state.fieldList,
                addresseeList: [...state.addresseeList]
            };
        }
        else {
            return state;
        }
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

export class SetAddresseeValueAction implements IFieldsReducerAction {
    constructor(private _index: number, private _field: string, private _value: string) { }

    public Action(state: FieldsReducerState): FieldsReducerState {
        if (this._index < 0 || this._index > state.addresseeList.length) {
            return state;
        }

        state.addresseeList[this._index][this._field] = this._value;

        return state;
    }
};

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