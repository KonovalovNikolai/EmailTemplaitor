import { useCallback } from "react"
import { DeletableListItem } from "./DeletableListItem"
import { UndeletableListItem } from "./UndeletableListItem"

export type DeletableListElement = {
    name: string
    isDeletable: true
}

export type UnDeletableListElement = {
    name: string
    isDeletable: false
}

export type ListElement = DeletableListElement | UnDeletableListElement

type Props = {
    list: ListElement[]
    onChange: (list: ListElement[]) => void
}

class List {
    private list: ListElement[]
    private importantElement: UnDeletableListElement = {
        name: "Email",
        isDeletable: false
    }

}

export const EditableList = ({ list, onChange }: Props) => {
    const validate: (newName: string) => boolean = useCallback(
        (newName: string): any => {
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                if (element.name === newName) {
                    
                    return false
                }
            }
            return true
        },
        [list]
    )

    return (
        <div>
            {list.length > 0 &&
                list.map((element) => {
                    const {name, isDeletable} = element

                    if (isDeletable) {
                        return (
                            <DeletableListItem
                                key={name}
                                element={element}
                                validator={validate}
                                onDelete={() => {
                                    const newList = list.filter(e => e.name !== name)
                                    onChange(newList)
                                }}
                            />
                        )
                    }

                    return (
                        <UndeletableListItem 
                            key={name}
                            element={element}
                            validator={validate}
                        />
                    )
                })
            }
        </div>
    )
}