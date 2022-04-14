import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'
import {
    createEditor,
    Descendant,
    Transforms,
    Range,
    Editor
} from 'slate'

import RenderElement from './elements/RenderElement'
import RenderLeaf from './elements/RenderLeaf'
import { Portal } from '../Portal'
import { MentionElement } from './custom-types'
import { withMentions } from './plugins/withMentions'
import MarkButton from './components/MarkButton'
import { BlockButton } from './components/BlockButton'

import './Editor.css'
import { AutocompleteListItem } from './components/AutocompleteListItem'

interface Props {
    value: Descendant[];
    onChange: React.Dispatch<any>;
}

const CustomEditor = ({ value, onChange }: Props) => {
    const editor = useMemo(
        () => withMentions(withReact(withHistory(createEditor()))),
        []
    )

    const renderElement = useCallback(props => <RenderElement {...props} />, [])
    const renderLeaf = useCallback(props => <RenderLeaf {...props} />, [])

    const ref = useRef<HTMLDivElement | null>()

    const [target, setTarget] = useState<Range | undefined>()
    const [index, setIndex] = useState(0)
    const [search, setSearch] = useState('')

    const chars = CHARACTERS.filter(c =>
        c.toLowerCase().startsWith(search.toLowerCase())
    ).slice(0, 10)

    const onKeyDown = useCallback(
        event => {
            if (target) {
                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault()
                        const prevIndex = index >= chars.length - 1 ? 0 : index + 1
                        setIndex(prevIndex)
                        break
                    case 'ArrowUp':
                        event.preventDefault()
                        const nextIndex = index <= 0 ? chars.length - 1 : index - 1
                        setIndex(nextIndex)
                        break
                    case 'Tab':
                    case 'Enter':
                        event.preventDefault()
                        Transforms.select(editor, target)
                        insertMention(editor, chars[index])
                        setTarget(null)
                        break
                    case 'Escape':
                        event.preventDefault()
                        setTarget(null)
                        break
                }
            }
        },
        [index, search, target]
    )

    useEffect(() => {
        if (target && chars.length > 0) {
            const el = ref.current
            const domRange = ReactEditor.toDOMRange(editor, target)
            const rect = domRange.getBoundingClientRect()
            el.style.top = `${rect.top + window.pageYOffset + 24}px`
            el.style.left = `${rect.left + window.pageXOffset}px`
        }
    }, [chars.length, editor, index, search, target])

    return (
        <div className='editor'>
            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                    onChange(value)
                    const { selection } = editor

                    if (selection && Range.isCollapsed(selection)) {
                        const [start] = Range.edges(selection)

                        const charBefore = Editor.before(editor, start, { unit: 'character' })
                        const range = charBefore && Editor.range(editor, charBefore, start)
                        const character = range && Editor.string(editor, range)

                        if (character === "#") {
                            setTarget(range)
                            setSearch("")
                            setIndex(0)
                            return
                        }

                        const wordBefore = Editor.before(editor, start, { unit: 'word' })
                        const before = wordBefore && Editor.before(editor, wordBefore)
                        const beforeRange = before && Editor.range(editor, before, start)
                        const beforeText = beforeRange && Editor.string(editor, beforeRange)

                        const beforeMatch = beforeText && beforeText.match(/^#(\w+)$/)
                        const after = Editor.after(editor, start)
                        const afterRange = Editor.range(editor, start, after)
                        const afterText = Editor.string(editor, afterRange)
                        const afterMatch = afterText.match(/^(\s|$)/)

                        if (beforeMatch && afterMatch) {
                            setTarget(beforeRange)
                            setSearch(beforeMatch[1])
                            setIndex(0)
                            return
                        }
                    }

                    setTarget(null)
                }}
            >
                <div className='toolbar'>
                    <MarkButton format='bold' text='B' />
                    <MarkButton format='italic' text='i' />
                    <MarkButton format='underline' text='U' />
                    <BlockButton format='heading-one' text='h1' />
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
                    onKeyDown={onKeyDown}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    spellCheck
                    autoFocus
                />
                {target && chars.length > 0 && (
                    <Portal>
                        <div
                            ref={ref}
                            style={{
                                top: '-9999px',
                                left: '-9999px',
                                position: 'absolute',
                                zIndex: 1,
                                padding: '3px',
                                background: 'white',
                                borderRadius: '4px',
                                boxShadow: '0 1px 5px rgba(0,0,0,.2)',
                            }}
                            data-cy="mentions-portal"
                        >
                            {chars.map((char, i) => (
                                <AutocompleteListItem
                                    key={char}
                                    char={char}
                                    isSelected={i === index}
                                    onClick={() => {
                                        Transforms.select(editor, target)
                                        insertMention(editor, char)
                                        setTarget(null)
                                    }}
                                />
                            ))}
                        </div>
                    </Portal>
                )}
            </Slate>
        </div >
    );
}

const insertMention = (editor, character) => {
    const mention: MentionElement = {
        type: 'mention',
        character,
        children: [{ text: '' }],
    }
    Transforms.insertNodes(editor, mention)
    Transforms.move(editor)
}

const CHARACTERS = [
    "Bas",
    'Aayla Secura',
    'Adi Gallia',
    'Admiral Dodd Rancit',
    'Admiral Firmus Piett',
    'Admiral Gial Ackbar',
    'Admiral Ozzel',
    'Admiral Raddus',
    'Admiral Terrinald Screed',
    'Admiral Trench',
    'Admiral U.O. Statura',
    'Agen Kolar',
    'Agent Kallus',
    'Aiolin and Morit Astarte',
    'Aks Moe',
    'Almec',
    'Alton Kastle',
    'Amee',
    'AP-5',
    'Armitage Hux',
]

export default CustomEditor
