import { Editor, Element as SlateElement } from "slate";

export const isMarkActive = (editor: Editor, format: string) => {
    const { selection } = editor;

    if (!!selection && selection.anchor.path.length === 3) {
        const selectedVariables = Array.from(Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "variable"
        }));

        if (selectedVariables.length >= 1) {
            const [variable, _] = selectedVariables[0];
            return variable[format];
        }
    }

    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};
