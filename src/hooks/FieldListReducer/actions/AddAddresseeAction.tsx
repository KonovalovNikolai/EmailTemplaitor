import { Addressee, createAddressee } from "../../../utils/Addressee";
import { FieldsReducerState, IFieldsReducerAction } from "../types";


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
