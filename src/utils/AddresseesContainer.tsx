import { Addressee } from "./Addressee";

interface AddresseesContainerData {
    [addresseeID: number]: Addressee;
}

export class AddresseesContainer {
    private addressees: AddresseesContainerData = {};
    private idCounter: number = 0;

    public GetAddressees() {
        return this.addressees;
    }
    public Add(addressee: Addressee) {
        addressee.SetId(this.idCounter);
        this.addressees[this.idCounter++] = addressee;
    }
    public Remove(id: number) {
        if (id in this.addressees) {
            delete this.addressees[id];
        }
    }
    public AddField(fieldName: string) {
        for (let key in this.addressees) {
            this.addressees[key].AddField(fieldName);
        }
    }
    public RemoveField(fieldName: string) {
        for (let key in this.addressees) {
            this.addressees[key].RemoveField(fieldName);
        }
    }
    public RenameField(fieldName: string, newName: string) {
        for (let key in this.addressees) {
            this.addressees[key].RenameField(fieldName, newName);
        }
    }
}
