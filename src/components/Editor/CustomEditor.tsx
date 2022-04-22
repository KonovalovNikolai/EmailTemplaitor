import React, { useCallback, useMemo, useState } from 'react'
import { Editable, withReact, Slate, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'
import {
    createEditor,
    Descendant,
    Transforms,
    Range,
    Editor,
    BaseRange
} from 'slate'

import RenderElement from './elements/RenderElement'
import RenderLeaf from './elements/RenderLeaf'
import { MentionElement } from './custom-types'
import { withMentions } from './plugins/withMentions'

import { Box, PopperProps } from '@mui/material'
import AutoCompletePoper from './components/AutoCompletePoper/AutoCompletePoper'
import { EditableList } from '../EditableList/EditableList'
import { FieldList } from '../EditableList/utils/FieldList'
import CustomSlateEditor from './CustomSlateEditor'

interface Props {
    value: Descendant[];
    list: FieldList
    onChange: React.Dispatch<any>;
    onListChange: React.Dispatch<React.SetStateAction<FieldList>>
}

const CustomEditor = ({ value, list, onChange, onListChange }: Props) => {
    const editor = useMemo(
        () => withMentions(withReact(withHistory(createEditor()))),
        []
    )

    return (
        <Box
            sx={{
                display: "flex",
                maxWidth: "800px",
                m: "20px auto",
                p: "20px",
                background: "white",
            }}
        >
            <CustomSlateEditor
                editor={editor}
                fieldList={list}
                value={value}
                onChange={onChange}
            />
            <EditableList
                fieldList={list}
                onChange={onListChange}
            />
        </Box >
    );
}

export default CustomEditor
