import { useSelected, useFocused } from "slate-react"

export const Mention = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()

    let character = <span>{`#${element.character}`}</span>
    if (element.bold) {
        character = <strong>{character}</strong>
    }
    if (element.italic) {
        character = <em>{character}</em>
    }
    if (element.underline) {
        character = <u>{character}</u>
    }


    return (
        <span
            {...attributes}
            contentEditable={false}
            data-cy={`mention-${element.character.replace(' ', '-')}`}
            style={{
                padding: '3px 3px 2px',
                margin: '0 1px',
                verticalAlign: 'baseline',
                display: 'inline-block',
                borderRadius: '4px',
                backgroundColor: '#eee',
                fontSize: '0.9em',
                boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
            }}
        >
            {character}
            {children}
        </span>
    )
}