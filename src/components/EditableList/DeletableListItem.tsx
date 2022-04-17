import { ListElement } from "../../utils/FieldList"
import { Chip } from '@material-ui/core';

type Props = {
    element: ListElement
    onDelete: () => void
    validator: (newName: string) => boolean
}

export const DeletableListItem = ({ element, validator, onDelete }: Props) => {
    return (
        <Chip label={element.name} onDelete={onDelete}/>
    )
}