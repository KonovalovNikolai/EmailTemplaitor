import { Editor, Element as SlateElement, Transforms } from "slate";
import { MentionElement } from "../components/Editor/custom-types";

import isMarkActive from "./isMarkActive";

const toggleMark = (editor: any, format: string) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }

    const mentions = Array.from(
        Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "mention"
        })
    );

    mentions.forEach(element => {
        const [mention, cellPath] = element;

        if (!Editor.isEditor(mention) &&
            SlateElement.isElement(mention) &&
            mention.type === "mention") {
            const newMention: MentionElement = {
                type: 'mention',
                character: mention.character,
                children: [{ text: '' }],
                bold: mention.bold,
                italic: mention.italic,
                underline: mention.underline
            }
            newMention[format] = !isActive
            Transforms.setNodes(editor, newMention, {at: cellPath})
        }
    });
}

export default toggleMark;
