import { Addressee, createAddressee } from "../../../utils/Addressee";
import { VariablesReducerState, IVariablesReducerAction } from "../types";


export class AddAddresseeAction implements IVariablesReducerAction {
    private _newAddressee: Addressee;
    // public newAddresseeIndex: number;
    public constructor(private _shouldUpdate: boolean, newAddressee?: Addressee) {
        this._newAddressee = newAddressee;
    }

    public Action(state: VariablesReducerState): VariablesReducerState {
        if (!this._newAddressee) {
            this._newAddressee = createAddressee(state.variableList);
        }

        state.addresseeList.push(this._newAddressee);

        // this.newAddresseeIndex = state.addresseeList.length - 1;

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
