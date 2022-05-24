import { TabButton, TabIconButton } from './CustomTabs';

import EditIcon from '@mui/icons-material/Edit';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SendIcon from '@mui/icons-material/Send';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import SaveIcon from '@mui/icons-material/Save';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import { memo } from 'react';

import { styled } from '@mui/material/styles';

const SideMenuContainer = styled('div', { name: 'SideMenuContainer' })(({ theme }) => ({
  paddingTop: '10px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  backgroundColor: theme.palette.grey[900],

  "& .MuiSvgIcon-root": {
    fontSize: "2rem",
  }
}));

const CenterMenuContainer = styled("div", { name: "BottomMenuContainer" })({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: "center",
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
      <LightModeIcon className='LightThemeIcon' />
      <DarkModeIcon className='DarkThemeIcon' />
    </ThemeIconButton>
  );
};

interface SideMenuProps {
  tabsValue: number;
  upToDateStatus: boolean;
  onTabChange: (index: number) => void;
  onSave: () => void;
  onOpen: () => void;
  onThemeChange: () => void;
}

export const SideMenu = memo(({ tabsValue, upToDateStatus, onTabChange, onSave, onOpen, onThemeChange }: SideMenuProps) => {
  return (
    <SideMenuContainer>

      <TabButton index={0} value={tabsValue} icon={<EditIcon />} onChange={onTabChange} />
      <TabButton index={1} value={tabsValue} icon={<PeopleAltIcon />} onChange={onTabChange} />
      <TabButton index={2} value={tabsValue} icon={<SendIcon />} onChange={onTabChange} />

      <CenterMenuContainer>
        <TabIconButton disabled={upToDateStatus} onClick={onSave}><SaveIcon /></TabIconButton>
        <TabIconButton onClick={onOpen}><FolderOpenIcon /></TabIconButton>
      </CenterMenuContainer>

      <TabIconButton onClick={onThemeChange}><ThemeIcon /></TabIconButton>

    </SideMenuContainer>
  );
});
