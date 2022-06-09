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

type BlockElement =
  | BulletedListElement
  | HeadingElement
  | HeadingTwoElement
  | ListItemElement
  | NumberedListElement
  | ParagraphElement;

export const serializeNodeToHTML = (node: Descendant, addressee: Addressee): string => {
  if (Text.isText(node)) {
    return serializeText(node);
  }

  if (SlateElement.isElement(node)) {
    switch (node.type) {
      case 'heading-one':
        return serializeElement("h1", node, addressee);
      case 'heading-two':
        return serializeElement("h2", node, addressee);
      case "bulleted-list":
        return serializeElement("ul", node, addressee);
      case "numbered-list":
        return serializeElement("ol", node, addressee);
      case "list-item":
        return serializeElement("li", node, addressee);
      case "variable":
        return serializeVariable(node, addressee);
      default:
        return serializeElement("p", node, addressee);
    }
  }

  return "";
};

function serializeElement(element: string, node: BlockElement, addressee: Addressee) {
  const textAlign: string = node.align;
  const style = textAlign ?  `style="text-align: ${textAlign}"` : "";
  const content = node.children.map(n => { return serializeNodeToHTML(n, addressee); }).join("");

  return `<${element} ${style}>${content}</${element}>`;
}


function serializeVariable(node: VariableElement, addressee: Addressee) {
  return serializeMarkdownText(node, `${addressee[node.character]}`);
}

function serializeText(node: CustomText) {
  if (node.text.trim() === "") {
    return `${node.text}﻿`;
  }

  return serializeMarkdownText(node, node.text);
}

function serializeMarkdownText(node: VariableElement | CustomText, text: string) {
  let markdownText = text;

  if (node.bold) {
    markdownText = `<strong>${markdownText}</strong>`;
  }
  if (node.italic) {
    markdownText = `<i>${markdownText}</i>`;
  }
  if (node.underline) {
    markdownText = `<u>${markdownText}</u>`;
  }

  return markdownText;
}
