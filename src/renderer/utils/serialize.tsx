import {
    Descendant,
    Element as SlateElement,
    Text
} from 'slate';
import {
    BulletedListElement,
    HeadingElement, CustomText,
    HeadingTwoElement, ListItemElement,
    VariableElement, NumberedListElement, ParagraphElement
} from '../components/CustomSlateEditor';
import { Addressee } from './Addressee';

export const serializeNode = (node: Descendant, addressee: Addressee) => {
    if (Text.isText(node)) {
        return serializeText(node);
    }

    if (SlateElement.isElement(node)) {
        switch (node.type) {
            case 'heading-one':
                return serializeH1(node, addressee);
            case 'heading-two':
                return serializeH2(node, addressee);
            case "bulleted-list":
                return serializeBulletedList(node, addressee);
            case "numbered-list":
                return serializeNumberedList(node, addressee);
            case "list-item":
                return serializeListItem(node, addressee);
            case "variable":
                return serializeVariable(node, addressee);
            default:
                return serializeParagraph(node, addressee);
        }
    }

    return <></>;
};

function serializeH1(node: HeadingElement, addressee: Addressee) {
    const textAlign: any = node.align;
    return (
        <h1 style={{ textAlign: textAlign }}>
            {node.children.map(n => {
                return serializeNode(n, addressee);
            })}
        </h1>
    );
}

function serializeH2(node: HeadingTwoElement, addressee: Addressee) {
    const textAlign: any = node.align;
    return (
        <h2 style={{ textAlign: textAlign }}>
            {node.children.map(n => {
                return serializeNode(n, addressee);
            })}
        </h2>
    );
}

function serializeBulletedList(node: BulletedListElement, addressee: Addressee) {
    return (
        <ul style={{ textAlign: node.align as any }}>
            {node.children.map(n => {
                return (
                    serializeNode(n, addressee)
                );
            })}
        </ul>
    );
}

function serializeNumberedList(node: NumberedListElement, addressee: Addressee) {
    return (
        <ol style={{ textAlign: node.align as any }}>
            {node.children.map(n => {
                return (
                    serializeNode(n, addressee)
                );
            })}
        </ol>
    );
}

function serializeListItem(node: ListItemElement, addressee: Addressee) {
    return (
        <li style={{ textAlign: node.align as any }}>
            {node.children.map(n => {
                return (
                    serializeNode(n, addressee)
                );
            })}
        </li>
    );
}

function serializeParagraph(node: ParagraphElement, addressee: Addressee) {
  return (
      <p style={{ textAlign: node.align as any }}>
          {node.children.map(n => serializeNode(n, addressee))}
      </p>
  );
}

function serializeMarkdownNode(node: CustomText | VariableElement, text: string) {
  let element = <>{text}</>;

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

function serializeText(node: CustomText) {
  if (node.text.trim() === "") {
      return `${node.text}﻿`;
  }

  return serializeMarkdownNode(node, node.text);
}

function serializeVariable(node: VariableElement, addressee: Addressee) {
    let value = "";
    if (node.character in addressee) {
        value = addressee[node.character];
    }

    if (value === "") {
        return "";
    }

    return serializeMarkdownNode(node, value);
}
