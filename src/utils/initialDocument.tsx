import { Descendant } from "slate";

export const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            { text: 'Это ' },
            { text: 'Rich', bold: true },
            { text: ' Text ', italic: true },
            { text: 'редактор', underline: true },
            { text: ' для создания шаблонов электронных писем.' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    "С помощью инструментов вы можете делать выделенный текст, например, жирным или курсивом, ",
            },
            { text: 'жирным', bold: true },
            { text: ' или ' },
            { text: 'курсивом,', bold: true },
        ],
    },
    {
        type: 'paragraph',
        align: 'center',
        children: [{ text: 'или менять выравнивание текста!' }],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    "Вы можете вставлять переменные в текст нажав на элемент списка справа или начав вводить название переменной через #, вызывая список автозаполнения.",
            },
        ],
    },
    {
        type: 'paragraph',
        children: [
            { text: 'Переменная в тексте выглядит так: ' },
            {
                type: 'variable',
                character: 'Email',
                children: [{ text: '' }],
            },
            { text: '.' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            { text: 'К переменным можно применять форматирование как к обычному тексту: ' },
            {
                type: 'variable',
                character: 'Имя',
                children: [{ text: '' }],
                bold: true,
            },
            { text: ' ' },
            {
                type: 'variable',
                character: 'Фамилия',
                children: [{ text: '' }],
                italic: true,
            },
            { text: '.' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    "При отправке на места переменных будут вставлены данные получателя, введённые в разделе “Получатели”.",
            },
        ],
    },
] as any;