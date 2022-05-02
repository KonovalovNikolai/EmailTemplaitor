export interface AddresseeData {
    [fieldName: string]: string;
}

export class Addressee {
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