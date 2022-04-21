import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { Portal } from '../Portal'
import { MentionElement } from './custom-types'
import { withMentions } from './plugins/withMentions'

import './Editor.css'
import { AutocompleteListItem } from './AutocompleteListItem'
import { SlateToolBar } from './Toolbar'
import { Box, Paper, Popper, PopperProps, Typography } from '@mui/material'

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

    const [index, setIndex] = useState(0)
    const [search, setSearch] = useState('')
    const [open, setOpen] = React.useState(false);
    const [target, setTarget] = useState<Range | undefined>()
    const [anchorEl, setAnchorEl] = React.useState<PopperProps['anchorEl']>(null);

    const chars = CHARACTERS.filter(c =>
        c.toLowerCase().startsWith(search.toLowerCase())
    ).slice(0, 10)

    const onKeyDown = useCallback(
        event => {
            if (open) {
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
                        setAnchorEl(null)
                        setOpen(false)
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

    return (
        <Box
            sx={{
                maxWidth: "42em",
                m: "20px auto",
                p: "20px",
                background: "white",
            }}
        >
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
                            const getBoundingClientRect = () =>
                                GetBoundingClientRectFromRange(editor, range)

                            setAnchorEl({ getBoundingClientRect })
                            setTarget(range)
                            setOpen(true)
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
                            const getBoundingClientRect = () =>
                                GetBoundingClientRectFromRange(editor, beforeRange)

                            setAnchorEl({ getBoundingClientRect })
                            setOpen(true)
                            setTarget(beforeRange)
                            setSearch(beforeMatch[1])
                            setIndex(0)
                            return
                        }
                    }

                    setAnchorEl(null)
                    setTarget(null)
                    setOpen(false)
                }}
            >
                <SlateToolBar />

                <Editable
                    className='editable'
                    onKeyDown={onKeyDown}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    spellCheck
                    autoFocus
                />

                <Popper
                    id="auto-complete-list-popper"
                    open={open}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                >
                    <Paper>
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
                    </Paper>
                </Popper>
            </Slate>
        </Box >
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

function GetBoundingClientRectFromRange(editor: Editor, range: BaseRange) {
    return ReactEditor.toDOMRange(editor, range).getBoundingClientRect();
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
