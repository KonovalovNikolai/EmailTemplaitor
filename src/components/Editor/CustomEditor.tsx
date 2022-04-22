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

import { SlateToolBar } from './components/Toolbar/Toolbar'
import { Box, PopperProps } from '@mui/material'
import AutoCompletePoper from './components/AutoCompletePoper/AutoCompletePoper'

interface Props {
    value: Descendant[];
    onChange: React.Dispatch<any>;
}

type AutoCompleteData = {
    searchValue: string
    targetRange: Range
    anchorEl: PopperProps['anchorEl']
    listIndex: number
}

const CustomEditor = ({ value, onChange }: Props) => {
    const editor = useMemo(
        () => withMentions(withReact(withHistory(createEditor()))),
        []
    )

    const renderElement = useCallback(props => <RenderElement {...props} />, [])
    const renderLeaf = useCallback(props => <RenderLeaf {...props} />, [])

    const [autoCompleteData, setAutoCompleteData] = useState<AutoCompleteData | null>(null)

    const chars = CHARACTERS.filter(c =>
        c.toLowerCase().startsWith(autoCompleteData?.searchValue.toLowerCase())
    ).slice(0, 10)

    const handleKeyDown = useCallback(
        event => {
            if (!!autoCompleteData) {

                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault()
                        setAutoCompleteData(prevData => {
                            const index = prevData.listIndex
                            const newData = { ...prevData }
                            newData.listIndex = index >= chars.length - 1 ? 0 : index + 1
                            return newData
                        })
                        break
                    case 'ArrowUp':
                        event.preventDefault()
                        setAutoCompleteData(prevData => {
                            const index = prevData.listIndex
                            const newData = { ...prevData }
                            newData.listIndex = index >= chars.length - 1 ? 0 : index - 1
                            return newData
                        })
                        break
                    case 'Tab':
                    case 'Enter':
                        event.preventDefault()
                        Transforms.select(editor, autoCompleteData.targetRange)
                        insertMention(editor, chars[autoCompleteData.listIndex])
                        break
                    case 'Escape':
                        event.preventDefault()
                        setAutoCompleteData(null)
                        break
                }
            }
        },
        [chars, autoCompleteData]
    )

    const handleBlur = useCallback(
        () => setAutoCompleteData(null),
        []
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

                            const autoCompleteData: AutoCompleteData = {
                                anchorEl: { getBoundingClientRect },
                                listIndex: 0,
                                searchValue: "",
                                targetRange: range
                            }

                            setAutoCompleteData(autoCompleteData)

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

                            const autoCompleteData: AutoCompleteData = {
                                anchorEl: { getBoundingClientRect },
                                listIndex: 0,
                                searchValue: beforeMatch[1],
                                targetRange: beforeRange
                            }

                            setAutoCompleteData(autoCompleteData)
                            return
                        }
                    }

                    setAutoCompleteData(null)
                }}
            >
                <SlateToolBar />

                <Editable
                    className='editable'
                    onKeyDown={handleKeyDown}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onBlur={handleBlur}
                    spellCheck
                    autoFocus
                />
            </Slate>
            <AutoCompletePoper
                anchorEl={autoCompleteData?.anchorEl}
                chars={chars}
                open={!!autoCompleteData}
                index={autoCompleteData?.listIndex}
                onInsert={(value) => {
                    Transforms.select(editor, autoCompleteData?.targetRange)
                    insertMention(editor, value)
                }}
            />
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
