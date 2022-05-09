import { Addressee } from "../../../utils/Addressee";
import { IFieldsReducerAction, FieldsReducerState } from "../types";


export class DeleteAddresseeAction implements IFieldsReducerAction {
    public constructor(private _indexes: Set<number>, private _shouldUpdate: boolean) { }

    public Action(state: FieldsReducerState): FieldsReducerState {
        const newAddresseeList: Addressee[] = [];
        for (let index = 0; index < state.addresseeList.length; index++) {
            if (!this._indexes.has(index)) {
                newAddresseeList.push(state.addresseeList[index]);
            }
        }

        if (this._shouldUpdate) {
            return {
                fieldList: state.fieldList,
                addresseeList: newAddresseeList
            };
        }
        else {
            return state;
        }
    }
}
