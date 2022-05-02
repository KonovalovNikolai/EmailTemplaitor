import { ListElement } from "../../../utils/FieldList"

export interface SortButtonState {
    Sort(list: ListElement[]): ListElement[]

    ChangeState(): SortButtonState
}

export class DefaultSortButtonState implements SortButtonState {
    public Sort(list: ListElement[]): ListElement[] {
        return list
    }

    public ChangeState(): SortButtonState {
        return new AlphabeticalSortButtonState()
    }

}

class AlphabeticalSortButtonState implements SortButtonState {
    Sort(list: ListElement[]): ListElement[] {
        return list.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        })
    }
    ChangeState(): SortButtonState {
        return new ReverseAlphabeticalSortButtonState()
    }
    
}

class ReverseAlphabeticalSortButtonState implements SortButtonState {
    Sort(list: ListElement[]): ListElement[] {
        return list.sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
        })
    }

    ChangeState(): SortButtonState {
        return new DefaultSortButtonState()
    }
    
}