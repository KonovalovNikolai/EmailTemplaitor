import { Editor, Element as SlateElement, Transforms } from "slate";
import { isMarkActive } from "./isMarkActive";

export const toggleMark = (editor: any, format: string) => {
    const isActive = isMarkActive(editor, format);

    // Применяем изменение для обычных узлов
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }

    // Применяем изменения для упоминаний
    Array.from(
        Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "variable"
        })).forEach(element => {
            const [variable, cellPath] = element;

            if (
                !Editor.isEditor(variable) &&
                SlateElement.isElement(variable) &&
                variable.type === "variable"
            ) {
                const newVariable = { ...variable };
                newVariable[format] = !isActive;
                Transforms.setNodes(editor, newVariable, { at: cellPath });
            }
        }
        );
};
