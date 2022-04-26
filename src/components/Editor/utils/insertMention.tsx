import { Editor, Transforms } from "slate"
import { MentionElement } from "../custom-types"

export const insertMention = (editor: Editor, character: string) => {
    const mention: MentionElement = {
        type: 'mention',
        character,
        children: [{ text: '' }],
    }
    Transforms.insertNodes(editor, mention)
    Transforms.move(editor)
}