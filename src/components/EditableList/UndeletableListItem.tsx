import { ListElement } from "./EditableList"

type Props = {
    element: ListElement
    validator: (newName: string) => boolean
}

export const UndeletableListItem = ({ element, validator }: Props) => {
    return (
        <div>
            <div>{element.name}</div>
        </div>
    )
}