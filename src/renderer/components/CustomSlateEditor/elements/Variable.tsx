import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelected, useFocused } from "slate-react";

interface InlineVariableProps extends TypographyProps {
    focused?: boolean;
}

const InlineVariable = styled(Typography, {
    name: "InlineVariable",
    shouldForwardProp: (prop) => prop !== 'focused'
})<InlineVariableProps>(({ theme, focused }) => ({
    padding: '3px 3px 2px',
    margin: '0 1px',
    verticalAlign: 'baseline',
    display: 'inline-block',
    borderRadius: '4px',
    backgroundColor: 'rgba(224,224,224, 0.5)', // 'rgba(189,189,189, 0.5)',
    fontSize: '0.9em',

    ...(focused && {
        backgroundColor: "#0461D0", //theme.palette.primary.main,
    })
}));

export const Variable = ({ attributes, children, element }) => {
    const selected = useSelected();
    const focused = useFocused();

    let character = <span>{`#${element.character}`}</span>;
    if (element.bold) {
        character = <strong>{character}</strong>;
    }
    if (element.italic) {
        character = <em>{character}</em>;
    }
    if (element.underline) {
        character = <u>{character}</u>;
    }


    return (
        <InlineVariable
            {...attributes}
            contentEditable={false}
            data-cy={`variable-${element.character.replace(' ', '-')}`}
            focused={selected && focused}
            component={"span"}
        >
            {character}
            {children}
        </InlineVariable>
    );
};