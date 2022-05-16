import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#2C2C2C',
            light: '#F3F3F3',
            dark: '#ECECEC',
            contrastText: '#fff',
        },
    }
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

export default theme;