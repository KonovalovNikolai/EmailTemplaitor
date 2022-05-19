import { Addressee } from "../../../utils/Addressee";
import { IVariablesReducerAction, VariablesReducerState } from "../types";


export class DeleteAddresseeAction implements IVariablesReducerAction {
    public constructor(private _indexes: Set<number>, private _shouldUpdate: boolean) { }

    public Action(state: VariablesReducerState): VariablesReducerState {
        const newAddresseeList: Addressee[] = [];
        for (let index = 0; index < state.addresseeList.length; index++) {
            if (!this._indexes.has(index)) {
                newAddresseeList.push(state.addresseeList[index]);
            }
        }

        if (this._shouldUpdate) {
            return {
                variableList: state.variableList,
                addresseeList: newAddresseeList
            };
        }
        else {
            return state;
        }
    }
}
