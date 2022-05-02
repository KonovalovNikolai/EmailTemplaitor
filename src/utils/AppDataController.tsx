import { Addressee, AddresseeData } from "./Addressee";
import { AddresseesContainer } from "./AddresseesContainer";
import { Field, FieldList } from "./FieldList";

export class AppDataController {
    private fieldList: FieldList;
    private addresseesContainer: AddresseesContainer;

    public constructor(
        fieldList?: FieldList,
        addresseesContainer?: AddresseesContainer,
        list?: Field[],
        addresseesData?: AddresseeData[]
    ) {
        if (fieldList && addresseesContainer) {
            this.fieldList = fieldList;
            this.addresseesContainer = addresseesContainer;
            return;
        }
        
        this.fieldList = list ? new FieldList(list) : new FieldList([]);

        this.addresseesContainer = new AddresseesContainer();
        
        if (addresseesData) {
            for (const addresseeData of addresseesData) {
                const addressee = new Addressee(addresseeData);
                this.addresseesContainer.Add(addressee);
            }
        }
    }

    public GetFieldList(): FieldList {
        return this.fieldList;
    }

    public GetAddressees(): AddresseesContainer {
        return this.addresseesContainer;
    }

    public AddField(newField: Field): void {
        this.fieldList.Add(newField);
        this.addresseesContainer.AddField(newField.name);
    }

    public RemoveField(field: Field): void {
        this.fieldList.Delete(field);
        this.addresseesContainer.RemoveField(field.name);
    }

    public RenameField(field: Field, newField: Field): void {
        this.fieldList.Replace(field, newField);
        this.addresseesContainer.RenameField(field.name, newField.name);
    }

    public AddAddressee(addressee: Addressee = null) {
        if (!addressee) {
            const addressee: AddresseeData = {};
            this.fieldList.GetList("").forEach(f => addressee[f.name] = "");
            this.addresseesContainer.Add(new Addressee(addressee));
        }
        else {
            this.addresseesContainer.Add(addressee);
        }
    }

    public RemoveAddressee(id: number) {
        this.addresseesContainer.Remove(id);
    }

    public CreateNew() {
        return new AppDataController(this.fieldList, this.addresseesContainer)
    }
}