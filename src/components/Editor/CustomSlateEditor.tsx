import { Box, PopperProps } from "@mui/material";
import { FunctionComponent, memo, useCallback, useState } from "react";
import {
    createEditor,
    Descendant,
    Transforms,
    Range,
    Editor,
    BaseRange
} from 'slate'
import { Editable, ReactEditor, Slate } from "slate-react";
import { FieldList } from "../EditableList/utils/FieldList";
import AutoCompletePoper from "./components/AutoCompletePoper/AutoCompletePoper";
import { SlateToolBar } from "./components/Toolbar/Toolbar";
import { MentionElement } from "./custom-types";
import RenderElement from "./elements/RenderElement";
import RenderLeaf from "./elements/RenderLeaf";

interface CustomSlateEditorProps {
    editor: Editor
    value: Descendant[]
    fieldList: FieldList
    onChange: React.Dispatch<any>;
}

function GetBoundingClientRectFromRange(editor: Editor, range: BaseRange) {
    return ReactEditor.toDOMRange(editor, range).getBoundingClientRect();
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

type AutoCompleteData = {
    searchValue: string
    targetRange: Range
    anchorEl: PopperProps['anchorEl']
    listIndex: number
}

const CustomSlateEditor: FunctionComponent<CustomSlateEditorProps> = ({ editor, value, fieldList, onChange }) => {
    const renderElement = useCallback(props => <RenderElement {...props} />, [])
    const renderLeaf = useCallback(props => <RenderLeaf {...props} />, [])

    const [autoCompleteData, setAutoCompleteData] = useState<AutoCompleteData | null>(null)

    const chars = fieldList.GetListOfNames(autoCompleteData?.searchValue).sort().slice(0, 10)

    const handleChange = useCallback(
        (value: Descendant[]) => {
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
        },
        []
    )

    const handleBlur = useCallback(
        () => setAutoCompleteData(null),
        []
    )

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

    return (
        <Box
            sx={{
                paddingRight: "50px"
            }}
        >
            <Slate
                editor={editor}
                value={value}
                onChange={handleChange}
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
        </Box>
    );
}

export default memo(CustomSlateEditor);