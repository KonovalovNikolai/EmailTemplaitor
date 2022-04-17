import * as React from 'react';
import { FieldList, ListElement } from "../../utils/FieldList"
import { DeletableListItem } from "./DeletableListItem"
import { UndeletableListItem } from "./UndeletableListItem"

type Props = {
    fieldList: FieldList
    onChange: (list: FieldList) => void
}

export const EditableList = ({ fieldList, onChange }: Props) => {
    const validate = (newName: string) => {
        return fieldList.ContainName(newName)
    }

    const list = fieldList.GetList()

    return (
        <Paper
            sx={{ filter: 'blur(8px)' }}
        >
            {list.length > 0 &&
                list.map((element) => {
                    const { name, isDeletable } = element;

                    if (isDeletable) {
                        return (
                            <DeletableListItem
                                key={name}
                                element={element}
                                validator={validate}
                                onDelete={() => {
                                    onChange(fieldList.Delete(element));
                                }} />
                        );
                    }

                    return (
                        <UndeletableListItem
                            key={name}
                            element={element}
                            validator={validate} />
                    );
                })}
        </Paper>
    )
}