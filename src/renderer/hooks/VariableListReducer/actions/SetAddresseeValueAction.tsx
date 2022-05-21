import { VariablesReducerState, IVariablesReducerAction } from "../types";

export class SetAddresseeValueAction implements IVariablesReducerAction {
    constructor(private _index: number, private _variable: string, private _value: string) { }

    public Action(state: VariablesReducerState): VariablesReducerState {
        if (this._index < 0 || this._index > state.addresseeList.length) {
            return state;
        }

        state.addresseeList[this._index][this._variable] = this._value;

        return state;
    }
}
;
