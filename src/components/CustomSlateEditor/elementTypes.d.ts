import {
  Text,
  createEditor,
  Node,
  Element,
  Editor,
  Descendant,
  BaseEditor,
} from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type BulletedListElement = {
  type: 'bulleted-list';
  align?: string;
  children: Descendant[];
};

export type NumberedListElement = {
  type: 'numbered-list';
  align?: string;
  children: Descendant[];
};


export type HeadingElement = {
  type: 'heading-one';
  align?: string;
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: 'heading-two';
  align?: string;
  children: Descendant[];
};

// export type ImageElement = {
//   type: 'image';
//   url: string;
//   children: Descendant[];
// };

export type ListItemElement = {
  type: 'list-item';
  align?: string;
  children: Descendant[];
};

export type MentionElement = {
  type: 'mention';
  character: string;
  children: CustomText[];
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type ParagraphElement = {
  type: 'paragraph';
  align?: string;
  children: Descendant[];
};


type CustomElement =
  | BulletedListElement
  | NumberedListElement
  | HeadingElement
  | HeadingTwoElement
  | ListItemElement
  | MentionElement
  | ParagraphElement;

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  text: string;
};

export type EmptyText = {
  text: string;
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}