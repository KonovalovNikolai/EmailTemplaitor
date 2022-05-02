interface FieldBase {
    name: string;
}

export interface DeletableField extends FieldBase {
    isDeletable: true;
};

export interface UnDeletableField extends FieldBase {
    isDeletable: false;
};

export interface EmailField extends UnDeletableField {
    isEmail: true;
}

export type Field = DeletableField | UnDeletableField | EmailField;

/**
 * Класс представляющий поля пользователя.
 * 
 * Реализует методы для модификации списка полей.
 */
export class FieldList {
    private list: Field[];

    private importantElement: EmailField = {
        name: "Email",
        isDeletable: false,
        isEmail: true
    };

    public constructor(list: Field[]) {
        this.list = list;
    }

    public GetList(filter: string): Field[] {
        const list = [this.importantElement, ...this.list];
        return filter === "" ? list : list.filter(element => element.name.toLowerCase().startsWith(filter));
    }

    public GetListOfNames(filter: string): string[] {
        return this.GetList(filter).map<string>(element => element.name);
    }

    public Replace(field: Field, newElement: Field) {
        if (field === this.importantElement) {
            return;
        }

        const index = this.list.indexOf(field);
        if (~index) {
            this.list[index] = newElement;
        }
    }

    public Add(field: Field) {
        this.list.push(field);
    }

    public Delete(field: Field) {
        this.list = this.list.filter(e => e !== field);
    }

    public ContainName(name: string): boolean {
        if (name === this.importantElement.name) {
            return true;
        }

        return this.list.find(e => e.name === name) !== undefined;
    }
}