import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'
import {
    BaseEditor,
    Transforms,
    createEditor,
    Descendant,
} from 'slate'

import CustomElement from './elements/Element'
import CustomLeaf from './elements/Leaf'
import MarkButton from '../Toolbar/MarkButton'
import './Editor.css'

type UserElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: UserElement
        Text: CustomText
    }
}

interface Props {
    value: Descendant[];
    onChange: React.Dispatch<any>;
}

const CustomEditor = ({ value, onChange }: Props) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    const renderElement = useCallback(props => <CustomElement {...props} />, [])
    const renderLeaf = useCallback(props => <CustomLeaf {...props} />, [])

    return (
        <div className='editor'>
            <Slate editor={editor} value={value} onChange={value => onChange(value)}>
                <div className='toolbar'>
                    <MarkButton format={'bold'} text={'B'} />
                    <MarkButton format={'italic'} text={'i'} />
                    <MarkButton format={'underline'} text={'U'} />
                    <MarkButton format={'code'} text={'<>'} />
                </div>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    spellCheck
                    autoFocus
                />
            </Slate>
        </div>
    );
}


export default CustomEditor