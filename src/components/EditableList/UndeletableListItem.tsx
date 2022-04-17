import { ListElement } from "../../utils/FieldList"
import { Chip } from '@material-ui/core';

type Props = {
    element: ListElement
    validator: (newName: string) => boolean
}

export const UndeletableListItem = ({ element, validator }: Props) => {
    return (
        <Chip label={element.name} color="primary"/>
    )
}