import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const EditableArea = styled(Paper, { name: 'EditableArea' })(
  ({ theme }) => ({
    borderRadius: 0,

    background: theme.palette.background.default,

    flex: 'auto',
    alignSelf: 'stretch',
    flexGrow: '1',

    padding: '10px',

    overflowY: 'scroll',

    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderColor: theme.palette.divider,

    '& .editable': {
      height: '100%',
      lineHeight: '1.4',

      '& p': {
        margin: 0,
      },

      '&.editable > * + *': {
        marginTop: '1em',
      },
    },

    '::-webkit-scrollbar': {
      width: '11px',
    },

    '::-webkit-scrollbar-track': {
      background: 'transparent',
      borderLeftWidth: '1px',
      borderLeftStyle: 'solid',
      borderColor: theme.palette.divider,
    },

    '::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.divider,
    },
  })
);
