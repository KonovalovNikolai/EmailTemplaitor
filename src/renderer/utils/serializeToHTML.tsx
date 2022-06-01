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

type BlockElement =
  | BulletedListElement
  | HeadingElement
  | HeadingTwoElement
  | ListItemElement
  | NumberedListElement
  | ParagraphElement;

export const serializeNodeToHTML = (node: Descendant): string => {
  if (Text.isText(node)) {
    return serializeText(node);
  }

  if (SlateElement.isElement(node)) {
    switch (node.type) {
      case 'heading-one':
        return serializeElement("h1", node);
      case 'heading-two':
        return serializeElement("h2", node);
      case "bulleted-list":
        return serializeElement("ul", node);
      case "numbered-list":
        return serializeElement("ol", node);
      case "list-item":
        return serializeElement("li", node);
      case "variable":
        return serializeVariable(node);
      default:
        return serializeElement("p", node);
    }
  }

  return "";
};

function serializeElement(element: string, node: BlockElement) {
  const textAlign: string = node.align;
  const style = textAlign ?  `style="text-align: ${textAlign}"` : "";
  const content = node.children.map(n => { return serializeNodeToHTML(n); }).join("");

  return `<${element} ${style}>${content}</${element}>`;
}


function serializeVariable(node: VariableElement) {
  return serializeMarkdownText(node, `{${node.character}}`);
}

function replaceImportantSymbols(text: string): string {
  return text.replaceAll("{", "/{").replaceAll("}", "/}");
}

function serializeText(node: CustomText) {
  if (node.text.trim() === "") {
    return `${node.text}﻿`;
  }

  return serializeMarkdownText(node, replaceImportantSymbols(node.text));
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
