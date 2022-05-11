import { Editor, Transforms } from "slate"
import { MentionElement } from "../elementTypes";

export const insertMention = (editor: Editor, character: string) => {
    const mention: MentionElement = {
        type: 'mention',
        character,
        children: [{ text: '' }],
    }
    Transforms.insertNodes(editor, mention)
    Transforms.move(editor)
}