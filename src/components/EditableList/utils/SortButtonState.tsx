import { Field } from "../../../utils/FieldList"

export interface SortButtonState {
    Sort(list: Field[]): Field[]

    ChangeState(): SortButtonState
}

export class DefaultSortButtonState implements SortButtonState {
    public Sort(list: Field[]): Field[] {
        return list
    }

    public ChangeState(): SortButtonState {
        return new AlphabeticalSortButtonState()
    }

}

class AlphabeticalSortButtonState implements SortButtonState {
    Sort(list: Field[]): Field[] {
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
    Sort(list: Field[]): Field[] {
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