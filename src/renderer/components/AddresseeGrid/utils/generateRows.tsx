import { Addressee } from "../../../utils/Addressee";

export function generateRows(list: Addressee[]) {
    return list.map((addressee: Addressee, index: number) => {
        return {
            id: index,
            ...addressee
        };
    });
}