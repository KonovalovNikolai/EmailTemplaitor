import { Editor, Element as SlateElement } from "slate";

export const isMarkActive = (editor: Editor, format: string) => {
    const { selection } = editor;

    console.log(selection);


    if (!!selection && selection.anchor.path.length === 3) {
        const selectedMentions = Array.from(Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "mention"
        }));

        console.log(selectedMentions);

        if (selectedMentions.length >= 1) {
            const [mention, _] = selectedMentions[0];
            return mention[format];
        }
    }

    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};
