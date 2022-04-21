type Props = {
    char: string
    isSelected: boolean
    onClick: () => void
}

export const AutocompleteListItem = ({ char, isSelected, onClick }: Props) => {
    return (
        <div
            onClick={onClick}
            style={{
                padding: '1px 3px',
                borderRadius: '3px',
                background: isSelected ? '#B4D5FF' : 'transparent',
            }}
        >
            {char}
        </div>
    )
}