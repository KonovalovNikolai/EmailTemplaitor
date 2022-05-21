import { IGetLabel, ISortState } from "../types";

export class DefaultSortButtonState<T> implements ISortState<T> {
    public Sort(list: T[], getLabel: IGetLabel<T>): T[] {
        return list
    }

    public ChangeState(): ISortState<T> {
        return new AlphabeticalSortButtonState<T>()
    }

}

class AlphabeticalSortButtonState<T> implements ISortState<T> {
    Sort(list: T[], getLabel: IGetLabel<T>) {
        return list.sort((a, b) => {
            if (getLabel(a) > getLabel(b)) return 1;
            if (getLabel(a) < getLabel(b)) return -1;
            return 0;
        })
    }
    ChangeState(): ISortState<T> {
        return new ReverseAlphabeticalSortButtonState<T>()
    }
    
}

class ReverseAlphabeticalSortButtonState<T> implements ISortState<T> {
    Sort(list: T[], getLabel: IGetLabel<T>) {
        return list.sort((a, b) => {
            if (getLabel(a) > getLabel(b)) return -1;
            if (getLabel(a) < getLabel(b)) return 1;
            return 0;
        })
    }

    ChangeState(): ISortState<T> {
        return new DefaultSortButtonState<T>()
    }
    
}