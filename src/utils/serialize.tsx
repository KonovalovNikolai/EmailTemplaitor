import {
    Descendant,
    Element as SlateElement,
    Text
} from 'slate';
import {
    BulletedListElement,
    HeadingElement, CustomText,
    HeadingTwoElement, ListItemElement,
    MentionElement, NumberedListElement, ParagraphElement
} from '../components/CustomSlateEditor';

export const serializeNode = (node: Descendant) => {
    if (Text.isText(node)) {
        return serializeText(node);
    }

    if (SlateElement.isElement(node)) {
        switch (node.type) {
            case 'heading-one':
                return serializeH1(node);
            case 'heading-two':
                return serializeH2(node);
            case "bulleted-list":
                return serializeBulletedList(node);
            case "numbered-list":
                return serializeNumberedList(node);
            case "list-item":
                return serializeListItem(node);
            case "mention":
                return serializeMention(node);
            default:
                return serializeParagraph(node);
        }
    }
};

function serializeText(node: CustomText) {
    if (!node.text.trim()) {
        return <br />;
    }

    let element = <>{node.text}</>;

    if (node.bold) {
        element = <strong>{element}</strong>;
    }
    if (node.italic) {
        element = <i>{element}</i>;
    }
    if (node.underline) {
        element = <u>{element}</u>;
    }
    return element;
}

function serializeH1(node: HeadingElement) {
    const textAlign: any = node.align;
    return (
        <h1 style={{ textAlign: textAlign }}>
            {node.children.map(n => {
                return serializeNode(n);
            })}
        </h1>
    );
}

function serializeH2(node: HeadingTwoElement) {
    const textAlign: any = node.align;
    return (
        <h2 style={{ textAlign: textAlign }}>
            {node.children.map(n => {
                return serializeNode(n);
            })}
        </h2>
    );
}

function serializeBulletedList(node: BulletedListElement) {
    return (
        <ul style={{ textAlign: node.align as any }}>
            {node.children.map(n => {
                return (
                    serializeNode(n)
                );
            })}
        </ul>
    );
}

function serializeNumberedList(node: NumberedListElement) {
    return (
        <ol style={{ textAlign: node.align as any }}>
            {node.children.map(n => {
                return (
                    serializeNode(n)
                );
            })}
        </ol>
    );
}

function serializeListItem(node: ListItemElement) {
    return (
        <ol style={{ textAlign: node.align as any }}>
            {node.children.map(n => {
                return (
                    serializeNode(n)
                );
            })}
        </ol>
    );
}

function serializeMention(node: MentionElement) {
    let element = <>{node.character}</>;

    if (node.bold) {
        element = <strong>{element}</strong>;
    }
    if (node.italic) {
        element = <i>{element}</i>;
    }
    if (node.underline) {
        element = <u>{element}</u>;
    }
    return element;
}

function serializeParagraph(node: ParagraphElement) {
    return (
        <p style={{ textAlign: node.align as any }}>
            {node.children.map(n => serializeNode(n))}
        </p>
    );
}