export type DeletableListElement = {
    name: string;
    isDeletable: true;
};

export type UnDeletableListElement = {
    name: string;
    isDeletable: false;
};

export type ListElement = DeletableListElement | UnDeletableListElement;

/**
 * Класс представляющий поля пользователя.
 * 
 * Реализует методы для модификации списка полей.
 */
export class FieldList {
    private list: ListElement[];
    private addresseesContainer: AddresseesContainer;
    private importantElement: UnDeletableListElement = {
        name: "Email",
        isDeletable: false
    };

    public constructor(list: ListElement[], addresseesContainer: AddresseesContainer) {
        this.list = list;
        if (!addresseesContainer) {
            const addressee: AddresseeData = {};
            this.GetList("").forEach(element => addressee[element.name] = "");
            
            this.addresseesContainer = new AddresseesContainer([addressee]);
        }
        else {
            this.addresseesContainer = addresseesContainer;
        }
    }

    public GetAddressees(): AddresseesContainer {
        return this.addresseesContainer;
    }

    public GetList(filter: string): ListElement[] {
        const list = [this.importantElement, ...this.list];
        return filter === "" ? list : list.filter(element => element.name.toLowerCase().startsWith(filter));
    }

    public GetListOfNames(filter: string): string[] {
        return this.GetList(filter).map<string>(element => element.name);
    }

    public Replace(element: ListElement, newElement: ListElement): FieldList {
        if (element === this.importantElement) {
            return this.NewFieldList();
        }

        const index = this.list.indexOf(element);
        if (~index) {
            this.list[index] = newElement;
            this.addresseesContainer.RenameField(element.name, newElement.name);
        }

        return this.NewFieldList();
    }

    public Add(element: ListElement): FieldList {
        this.list.push(element);
        this.addresseesContainer.AddField(element.name);
        return this.NewFieldList();
    }

    public Delete(element: ListElement): FieldList {
        this.list = this.list.filter(e => e !== element);
        this.addresseesContainer.RemoveField(element.name);
        return this.NewFieldList();
    }

    public ContainName(name: string): boolean {
        if (name === this.importantElement.name) {
            return true;
        }

        return this.list.find(e => e.name === name) !== undefined;
    }

    private NewFieldList(): FieldList {
        return new FieldList(this.list, this.addresseesContainer);
    }
}

interface AddresseesContainerData {
    [addresseeID: number]: Addressee;
}

class AddresseesContainer {
    private addressees: AddresseesContainerData = {};
    private idCounter: number = 0;

    public constructor(addressees: [AddresseeData]) {
        for (const addressee of addressees) {
            this.Add(new Addressee(addressee));
        }
    }

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

interface AddresseeData {
    [fieldName: string]: string;
}

class Addressee {
    private id: number;

    private data: AddresseeData = {};

    public constructor(data: AddresseeData) {
        this.data = data;
    }

    public GetId(): number {
        return this.id;
    }

    public SetId(id: number) {
        this.id = id;
    }

    public GetData() {
        return this.data;
    }

    public AddField(fieldName: string) {
        if (fieldName in this.data) {
            return;
        }

        this.data[fieldName] = "";
    }
    public RemoveField(fieldName: string) {
        if (fieldName in this.data) {
            delete this.data[fieldName];
        }
    }

    public RenameField(fieldName: string, newName: string) {
        if (fieldName in this.data && !(newName in this.data)) {
            this.data[newName] = this.data[fieldName];
            delete this.data[fieldName];
        }
    }
    public SetField(fieldName: string, value: string) {
        if (fieldName in this.data) {
            this.data[fieldName] = value;
        }
    }
}