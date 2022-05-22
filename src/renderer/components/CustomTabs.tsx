import { IconButton, IconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, useCallback } from 'react';

interface TabIconButtonProps extends IconButtonProps {
	current?: boolean;
}

export const TabIconButton = styled(IconButton, {
	shouldForwardProp: (prop) => prop !== 'current'
})<TabIconButtonProps>(({ current, theme }) => ({
	padding: '0px',
	width: '60px',
	height: '60px',

	color: theme.palette.grey[200],

	':hover': {
		color: theme.palette.primary.main
	},

	...current && {
		color: theme.palette.primary.main
	}
}));

interface TabButtonProps {
  index: number;
  value: number;
  icon: string | React.ReactElement;
  onChange: (index: number) => void;
}

export const TabButton = memo(
  ({ index, value, icon, onChange }: TabButtonProps) => {
    const isCurrent = value === index;

    const handleClick = useCallback(() => onChange(index), [index, onChange]);

    return (
      <TabIconButton
        disableRipple={true}
        disableTouchRipple={true}
        current={isCurrent}
        onClick={handleClick}
      >
        {icon}
      </TabIconButton>
    );
  }
);

interface TabContentProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

export const TabContent = memo(
  ({ index, value, children }: TabContentProps) => {
    const isCurrent = index === value;

    return <>{isCurrent && <>{children}</>}</>;
  }
);
