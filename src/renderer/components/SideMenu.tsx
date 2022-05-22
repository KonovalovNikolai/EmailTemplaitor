import { TabButton, TabIconButton } from './CustomTabs';

import EditIcon from '@mui/icons-material/Edit';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SendIcon from '@mui/icons-material/Send';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import SaveIcon from '@mui/icons-material/Save';

import { memo } from 'react';

import { styled } from '@mui/material/styles';
import { AppTheme } from 'renderer/utils/AppTheme';

const SideMenuContainer = styled('div', { name: 'SideMenuContainer' })(({ theme }) => ({
  paddingTop: '10px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  backgroundColor: theme.palette.grey[900]
}));

const BottomMenuContainer = styled("div", { name: "BottomMenuContainer" })({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: "flex-end",
  alignItems: 'center',
  flex: "none",
  flexGrow: 1,
});

const ThemeIconButton = styled(TabIconButton, { name: 'SideMenuContainer' })(({ theme }) => ({
  ...theme.palette.mode === 'dark' && {
    ".LightThemeIcon": {
      display: "none",
    },
  },

  ...theme.palette.mode === 'light' && {
    ".DarkThemeIcon": {
      display: "none",
    },
  },
}));

const ThemeIcon = () => {
  return (
    <ThemeIconButton>
      <LightModeIcon className='LightThemeIcon' sx={{ fontSize: 30 }} />
      <DarkModeIcon className='DarkThemeIcon' sx={{ fontSize: 30 }} />
    </ThemeIconButton>
  );
};

interface SideMenuProps {
  tabsValue: number;
  onTabChange: (index: number) => void;
  onThemeChange: () => void;
}

export const SideMenu = memo(({ tabsValue, onTabChange, onThemeChange }: SideMenuProps) => {
  return (
    <SideMenuContainer>
      <TabButton index={0} value={tabsValue} icon={<EditIcon />} onChange={onTabChange} />
      <TabButton
        index={1}
        value={tabsValue}
        icon={<PeopleAltIcon />}
        onChange={onTabChange}
      />
      <TabButton index={2} value={tabsValue} icon={<SendIcon />} onChange={onTabChange} />
      <BottomMenuContainer>
        <TabIconButton><SaveIcon /></TabIconButton>
        <TabIconButton onClick={onThemeChange}><ThemeIcon /></TabIconButton>
      </BottomMenuContainer>
    </SideMenuContainer>
  );
});
