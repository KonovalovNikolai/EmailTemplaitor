import { Descendant } from "slate";

export const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '????', underline: true },
            { text: '!' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    "Since it's rich text, you can do things like turn a selection of text ",
            },
            { text: 'bold', bold: true },
            {
                text:
                    ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'heading',
        align: 'center',
        children: [{ text: 'Try it out for yourself!' }],
    },
    {
        type: 'paragraph',
        children: [
          { text: 'Try variable, like ' },
          {
            type: 'variable',
            character: 'R2-D2',
            children: [{ text: '' }],
          },
          { text: ' or ' },
          {
            type: 'variable',
            character: 'Mace Windu',
            children: [{ text: '' }],
          },
          { text: '!' },
        ],
      },
] as any;