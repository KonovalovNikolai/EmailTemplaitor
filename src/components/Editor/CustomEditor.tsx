import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import { withHistory } from 'slate-history'
import {
    createEditor,
    Descendant,
} from 'slate'

import RenderElement from './elements/Element'
import RenderLeaf from './elements/Leaf'
import MarkButton from '../Toolbar/MarkButton'
import './Editor.css'
import { BlockButton } from '../Toolbar/BlockButton'

interface Props {
    value: Descendant[];
    onChange: React.Dispatch<any>;
}

const CustomEditor = ({ value, onChange }: Props) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    const renderElement = useCallback(props => <RenderElement {...props} />, [])
    const renderLeaf = useCallback(props => <RenderLeaf {...props} />, [])

    return (
        <div className='editor'>
            <Slate editor={editor} value={value} onChange={value => onChange(value)}>
                <div className='toolbar'>
                    <MarkButton format='bold' text={'B'} />
                    <MarkButton format='italic' text={'i'} />
                    <MarkButton format={'underline'} text={'U'} />
                    <MarkButton format={'code'} text={'<>'} />
                    <BlockButton format={'heading-one'} text={'h1'} />
                    <BlockButton format="heading-two" text="h2" />
                    <BlockButton format="block-quote" text="q" />
                    <BlockButton format="numbered-list" text="1" />
                    <BlockButton format="bulleted-list" text="." />
                    <BlockButton format="left" text="left" />
                    <BlockButton format="center" text="center" />
                    <BlockButton format="right" text="right" />
                    <BlockButton format="justify" text="justify" />
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