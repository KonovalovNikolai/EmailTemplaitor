import { FieldsReducerState, IFieldsReducerAction } from "../types";

export class SetAddresseeValueAction implements IFieldsReducerAction {
    constructor(private _index: number, private _field: string, private _value: string) { }

    public Action(state: FieldsReducerState): FieldsReducerState {
        if (this._index < 0 || this._index > state.addresseeList.length) {
            return state;
        }

        state.addresseeList[this._index][this._field] = this._value;

        return state;
    }
}
;
