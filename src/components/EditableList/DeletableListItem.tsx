import { ListElement } from "./EditableList"

type Props = {
    element: ListElement
    onDelete: () => void
    validator: (newName: string) => boolean
}

export const DeletableListItem = ({ element, validator, onDelete }: Props) => {
    return (
        <div>
            <input type="text"
                defaultValue={element.name}
                onBlur={(e) => {
                    const newName = e.target.value
                    if (newName === element.name)
                        return;
                        
                    if (validator(newName)) {
                        return;
                    }
                    e.target.value = element.name
                }}
            />
            <button
                onClick={onDelete}
            >
                x
            </button>
        </div>
    )
}