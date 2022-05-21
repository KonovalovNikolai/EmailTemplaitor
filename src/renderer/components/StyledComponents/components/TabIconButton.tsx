import { IconButton, IconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TabIconButtonProps extends IconButtonProps {
  current?: boolean;
}

export default styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'current',
})<TabIconButtonProps>(({ current, theme }) => ({
  padding: '0px',
  width: '60px',
  height: '60px',

  color: theme.palette.grey[200],

  ':hover': {
    color: theme.palette.primary.main,
  },

  ...(current && {
    color: theme.palette.primary.main,
  }),
}));
