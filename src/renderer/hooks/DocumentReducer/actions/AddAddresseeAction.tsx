import { Addressee, createAddressee } from "../../../utils/Addressee";
import { DocumentReducerState, IDocumentReducerAction } from "../types";


export class AddAddresseeAction implements IDocumentReducerAction {
    private _newAddressee: Addressee;
    // public newAddresseeIndex: number;
    public constructor(private _shouldUpdate: boolean, newAddressee?: Addressee) {
        this._newAddressee = newAddressee;
    }

    public Action(state: DocumentReducerState): DocumentReducerState {
        if (!this._newAddressee) {
            this._newAddressee = createAddressee(state.variableList);
        }

        state.addresseeList.push(this._newAddressee);

        // this.newAddresseeIndex = state.addresseeList.length - 1;

        if (this._shouldUpdate) {
            return {
                ...state,
                addresseeList: [...state.addresseeList]
            };
        }
        else {
            return state;
        }
    }
}
