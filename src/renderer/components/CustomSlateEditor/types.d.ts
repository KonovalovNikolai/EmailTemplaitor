import {
    Range
} from 'slate';

export interface AutoCompleteData {
    searchValue: string;
    targetRange: Range;
    anchorEl: PopperProps['anchorEl'];
    listIndex: number;
};