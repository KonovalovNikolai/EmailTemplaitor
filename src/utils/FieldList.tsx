export type DeletableListElement = {
    name: string
    isDeletable: true
}

export type UnDeletableListElement = {
    name: string
    isDeletable: false
}

export type ListElement = DeletableListElement | UnDeletableListElement

export class FieldList {
    private list: ListElement[]
    private importantElement: UnDeletableListElement = {
        name: "Email",
        isDeletable: false
    }

    public constructor(list: ListElement[]) {
        this.list = list
    }

    public GetList(): ListElement[] {
        return [this.importantElement, ...this.list]
    }

    public Replace(element: ListElement, newElement: ListElement): FieldList {
        if (element === this.importantElement) {
            return null;
        }

        const index = this.list.indexOf(element)
        if (~index) {
            this.list[index] = newElement
        }

        return new FieldList(this.list)
    }

    public Delete(element: ListElement): FieldList {
        this.list = this.list.filter(e => e !== element)

        return new FieldList(this.list)
    }

    public ContainName(name: string): boolean {
        if (name === this.importantElement.name) {
            return true;
        }
        
        for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index];
            if (element.name === name) {
                return true
            }
        }

        return false
    }
}