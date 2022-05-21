import { Addressee, createAddressee } from "../../../utils/Addressee";
import { VariablesReducerState, IVariablesReducerAction } from "../types";


export class AddAddresseeAction implements IVariablesReducerAction {
    public newAddressee: Addressee;
    public newAddresseeIndex: number;
    public constructor(private _shouldUpdate: boolean, newAddressee?: Addressee) {
        this.newAddressee = newAddressee;
    }

    public Action(state: VariablesReducerState): VariablesReducerState {
        if (!this.newAddressee) {
            this.newAddressee = createAddressee(state.variableList);
        }

        state.addresseeList.push(this.newAddressee);

        this.newAddresseeIndex = state.addresseeList.length - 1;

        console.log(this.newAddresseeIndex);

        if (this._shouldUpdate) {
            return {
                variableList: state.variableList,
                addresseeList: [...state.addresseeList]
            };
        }
        else {
            return state;
        }
    }
}
