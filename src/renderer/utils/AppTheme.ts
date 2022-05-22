import { createTheme, } from '@mui/material/styles';

const APPTHEME_STORAGE_KEY = "AppTheme";

export type AppTheme = "light" | "dark";

export function getTheme(theme: AppTheme) {
  if (theme === 'light') {
    return lightTheme;
  }
  return darkTheme;
}

export function initTheme(): AppTheme {
  const savedTheme = window.localStorage.getItem(APPTHEME_STORAGE_KEY);
  if (savedTheme === null) {
    return "light";
  }

  if (savedTheme === "light") {
    return "light";
  }

  if (savedTheme === "dark") {
    return "dark";
  }

  return "light";
}

export function toggleTheme(theme: AppTheme) {
  if (theme === 'light') {
    setTheme("dark");
    return "dark";
  }

  if (theme === 'dark') {
    setTheme("light");
    return "light";
  }

  return "light";
}

export function setTheme(theme: AppTheme) {
  window.localStorage.setItem(APPTHEME_STORAGE_KEY, theme);
}

export const lightTheme = createTheme({
  palette: {
    mode: "light"
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

